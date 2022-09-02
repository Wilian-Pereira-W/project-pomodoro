import { useState } from 'react';
import PomodoroTimer from './components/PomodoroTimer';

function App(): JSX.Element {
  const [pomodoroTime] = useState<number>(25);
  const [shortBreakTime] = useState<number>(5);
  const [longBreakTime] = useState<number>(15);

  return (
    <div className="container">
      <h1>Pomodoro Timer</h1>
      <form className="pomodoroOption">
        <label htmlFor="pomodoro">
          Pomodoro
          <input
            type="button"
            name="pomodoro"
            id="pomodoro"
            value={`${pomodoroTime}:00`}
          />
        </label>
        <label htmlFor="Intervalo-curto">
          Short Break
          <input
            type="button"
            name="Intervalo-curto"
            id="Intervalo-curto"
            value={`0${shortBreakTime}:00`}
          />
        </label>
        <label htmlFor="Intervalo-longo">
          Long Break
          <input
            type="button"
            name="Intervalo-longo"
            id="Intervalo-logo"
            value={`${longBreakTime}:00`}
          />
        </label>
      </form>
      <PomodoroTimer
        pomodoroTime={pomodoroTime * 60}
        shortRestTime={shortBreakTime * 60}
        longRestTime={longBreakTime * 60}
        cycles={4}
        disabled={pomodoroTime <= 0}
      />
    </div>
  );
}

export default App;
