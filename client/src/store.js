import {create} from "zustand";
import { backendaxios } from "./lib/backendaxios";
const useLogin = create((set) => {
    isLoggedIn: false
    login: () => set((state) => ({}))
    logout: () => set((state) => ({isLoggedIn: false}))
})

const useBubbleStore = create((set) => ({
    isVisible: false,
    setMessage: (msg) => set({ message: msg, isVisible: true }),
    hideMessage: () => set({ isVisible: false })
  }));

export default useBubbleStore;