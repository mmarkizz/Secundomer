// store.ts
import create from 'zustand';
import { persist } from 'zustand/middleware';

// Определяем типы состояния и действий
interface Timer {
  id: number;
  seconds: number;
  isActive: boolean;
}

interface TimerStore {
  timers: Timer[];
  startTimer: (id: number) => void;
  stopTimer: (id: number) => void;
  updateTimers: () => void;
  addTimer: (seconds: number) => void;
}

// Создаем Zustand Store с persist
const useTimerStore = create<TimerStore>(
  persist(
    (set) => ({
      timers: [],
      startTimer: (id) => set((state) => {
        const timer = state.timers.find(timer => timer.id === id);
        if (timer) {
          timer.isActive = true;
        }
      }),
      stopTimer: (id) => set((state) => {
        const timer = state.timers.find(timer => timer.id === id);
        if (timer) {
          timer.isActive = false;
        }
      }),
      updateTimers: () => set((state) => {
        state.timers.forEach(timer => {
          if (timer.isActive && timer.seconds > 0) {
            timer.seconds -= 1;
          }
        });
      }),
      addTimer: (seconds) => set((state) => {
        const newTimer: Timer = {
          id: Date.now(),
          seconds,
          isActive: false,
        };
        state.timers.push(newTimer);
      }),
    }),
    {
      name: 'timer-storage', // Имя ключа для localStorage
    }
  )
);

export default useTimerStore;
