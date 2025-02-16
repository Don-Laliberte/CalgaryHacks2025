import {create} from "zustand";
import { backendaxios } from "./lib/backendaxios";
const useLogin = create((set) => {
    isLoggedIn: false
    login: () => set((state) => ({}))
    logout: () => set((state) => ({isLoggedIn: false}))
})

export const useInfoStore = create((set) => ({
    isVisible: false,
    setMessage: (msg) => set({ message: msg, isVisible: true }),
    hideMessage: () => set({ isVisible: false })
  }));

  export const useQuestionStore = create((set) => ({
    isVisible: false,
    showMessage: () => set({ isVisible: true }),
    hideMessage: () => set({ isVisible: false })
}));
