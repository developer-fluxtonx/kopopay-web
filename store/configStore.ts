import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ConfigState {
  isTestMode: boolean;
  toggleTestMode: () => void;
  setTestMode: (status: boolean) => void;
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      isTestMode: false,
      toggleTestMode: () => set((state) => ({ isTestMode: !state.isTestMode })),
      setTestMode: (status) => set({ isTestMode: status }),
    }),
    {
      name: 'kopo-config-storage',
    }
  )
);
