import { useState } from 'react';
import { useInterval } from '../../hooks/useInterval';
import Button from '../Button';
import Timer from '../Timer';

interface Props {
  defaultPomodoroTime: number;
}
function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.defaultPomodoroTime);

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);

  return (
    <div className="pomodoro">
      <h2>You are: working</h2>
      <Timer mainTimer={mainTime} />
      <Button text="teste" onClick={() => console.log(1)}></Button>
    </div>
  );
}

export default PomodoroTimer;
