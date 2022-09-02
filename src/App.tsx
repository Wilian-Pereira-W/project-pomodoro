import PomodoroTimer from './components/PomodoroTimer';

function App(): JSX.Element {
  return (
    <div>
      <PomodoroTimer defaultPomodoroTime={1500} />
    </div>
  );
}

export default App;
