// App.tsx
import React, { useEffect } from 'react';
import useTimerStore from './store';

const App: React.FC = () => {
  const { timers, startTimer, stopTimer, updateTimers, addTimer } = useTimerStore();

  // Интервал для обновления таймеров каждую секунду
  useEffect(() => {
    const interval = setInterval(() => {
      updateTimers();
    }, 1000);

    return () => clearInterval(interval);
  }, [updateTimers]);

  const handleStart = (id: number) => startTimer(id);
  const handleStop = (id: number) => stopTimer(id);
  const handleAddTimer = () => addTimer(10); // Добавить таймер на 10 секунд

  return (
    <div>
      <button onClick={handleAddTimer}>Добавить таймер на 10 секунд</button>
      <ul>
        {timers.map((timer) => (
          <li key={timers.id}>
            Таймер: {timers.seconds} секунд
            <button onClick={() => handleStart(timers.id)}>Запустить</button>
            <button onClick={() => handleStop(timers.id)}>Остановить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
