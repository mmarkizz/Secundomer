import React, { useState, useEffect } from 'react';
import './App.css'; // Добавьте стили для лучшего отображения

function App() {
  const [activeTab, setActiveTab] = useState('stopwatch');

  return (
    <div className="App">
      <h1>Секундомер и Таймер</h1>
      <div>
        <button onClick={() => setActiveTab('stopwatch')}>Секундомер</button>
        <button onClick={() => setActiveTab('timer')}>Таймер</button>
      </div>

      {activeTab === 'stopwatch' && <Stopwatch />}
      {activeTab === 'timer' && <Timer />}
    </div>
  );
}

function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const handleLap = () => {
    setLaps([...laps, seconds]);
  };

  const handleReset = () => {
    setSeconds(0);
    setLaps([]);
    setIsActive(false);
  };

  const removeLap = (index) => {
    const newLaps = [...laps];
    newLaps.splice(index, 1);
    setLaps(newLaps);
  };

  return (
    <div>
      <h2>Секундомер</h2>
      <div>
        <span>{seconds}s</span>
        <br />
        <button onClick={() => setIsActive(!isActive)}>
          {isActive ? 'Пауза' : 'Старт'}
        </button>
        <button onClick={handleLap}>Круг</button>
        <button onClick={handleReset}>Сброс</button>
      </div>
      <h3>Круги:</h3>
      <ul>
        {laps.map((lap, index) => (
          <li key={index}>
            {lap}s <button onClick={() => removeLap(index)}>Удалить</button>
          </li>
        ))}
      </ul>
      {laps.length > 0 && (
        <button onClick={() => setLaps([])}>Удалить все круги</button>
      )}
    </div>
  );
}

function Timer() {
  const [timers, setTimers] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTimer = () => {
    const newTimer = {
      seconds: parseInt(inputValue),
      isActive: false,
      id: Date.now(),
    };
    setTimers([...timers, newTimer]);
    setInputValue('');
  };

  const toggleTimer = (id) => {
    setTimers(timers.map(timer =>
      timer.id === id ? { ...timer, isActive: !timer.isActive } : timer));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(timers =>
        timers.map(timer => {
          if (timer.isActive && timer.seconds > 0) {
            return { ...timer, seconds: timer.seconds - 1 };
          }
          return timer;
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Таймер</h2>
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Секунды"
      />
      <button onClick={addTimer}>Добавить таймер</button>
      <div>
        {timers.map(timer => (
          <div key={timer.id}>
            <span>{timer.seconds}s</span>
            <button onClick={() => toggleTimer(timer.id)}>
              {timer.isActive ? 'Пауза' : 'Старт'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
