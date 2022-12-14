import { useCallback, useEffect, useState } from 'react';
import { useInterval } from '../../hooks/useInterval';
import { workedHours } from '../../utils/ workedHours';
import Button from '../Button';
import Timer from '../Timer';
import Helmet from 'react-helmet';
import { secondsToTime } from '../../utils/secondsToTime';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellStart = require('../../sounds/bell-start.mp3');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellFinish = require('../../sounds/bell-finish.mp3');

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
  disabled: boolean;
}
function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState<number>(props.pomodoroTime);
  const [timeCounting, setTimeCounting] = useState<boolean>(false);
  const [working, setWorking] = useState<boolean>(false);
  const [resting, setResting] = useState<boolean>(false);
  const [cyclesQtdManager, setCyclesQtdManager] = useState<boolean[]>(
    new Array(props.cycles - 1).fill(true),
  );

  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);
  const [isTitle, setIsTitle] = useState(false);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCounting ? 1000 : null,
  );

  const configureWork = useCallback(() => {
    setIsTitle(true);
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.pomodoroTime);
    audioStartWorking.play();
  }, [props.pomodoroTime]);

  const configureRest = useCallback(
    (long: boolean) => {
      setTimeCounting(true);
      setWorking(false);
      setResting(true);

      if (long) {
        setMainTime(props.longRestTime);
      } else {
        setMainTime(props.shortRestTime);
      }
      audioStopWorking.play();
    },
    [props.longRestTime, props.shortRestTime],
  );

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');
    if (mainTime > 0) return;
    if (working && cyclesQtdManager.length > 0) {
      configureRest(false);
      cyclesQtdManager.pop();
    } else if (working && cyclesQtdManager.length <= 0) {
      configureRest(true);
      setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
    if (resting) configureWork();
  }, [
    completedCycles,
    configureRest,
    configureWork,
    cyclesQtdManager,
    mainTime,
    numberOfPomodoros,
    props.cycles,
    resting,
    working,
  ]);
  return (
    <>
      {isTitle ? (
        <Helmet title={secondsToTime(mainTime)} />
      ) : (
        <Helmet title="Pomodoro Timer" />
      )}

      <div className="pomodoro">
        <h2>Voc?? est?? {working ? 'trabalhando.' : 'descansando.'}</h2>
        <Timer mainTimer={mainTime} />
        <div className="controls">
          <Button
            text="START"
            onClick={() => configureWork()}
            disabled={props.disabled}
          ></Button>
          <Button text="RESTING" onClick={() => configureRest(false)}></Button>
          <Button
            className={!working && !resting ? 'hidden' : ''}
            text={timeCounting ? 'PAUSE' : 'PLAY'}
            onClick={() => setTimeCounting(!timeCounting)}
          ></Button>
        </div>
        <div className="details">
          <p>Ciclos conclu??dos: {completedCycles}</p>
          <p>Horas trabalhadas: {workedHours(fullWorkingTime)}</p>
          <p>Pomodoros conclu??dos: {numberOfPomodoros}</p>
        </div>
      </div>
    </>
  );
}

export default PomodoroTimer;
