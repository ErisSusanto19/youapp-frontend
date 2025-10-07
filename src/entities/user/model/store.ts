import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthState } from './type';

export const useUserStore = create<AuthState>()(
    persist(
        (set, get) => ({
            profile: null,
            token: null,
            setAuth: (token, profile) => set({token, profile}),
            setProfile: (profile) => set({ profile }),
            logout: () => {
                set({token: null, profile: null})
                localStorage.removeItem('youapp-auth-storage')
            }
        }),
        {
            name: 'youapp-auth-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)

export const logoutUser = () => {
    useUserStore.getState().logout();
}