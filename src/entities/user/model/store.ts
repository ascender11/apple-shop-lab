import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { PublicUser } from './types'

interface UserState {
  user: PublicUser | null
  setUser: (user: PublicUser) => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,

      setUser: (user) => set({ user }),

      logout: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }),
    }
  )
)
