import {create} from "zustand";
import { backendaxios } from "./lib/backendaxios";
import { questions } from "./data/quizQuestions";
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

export const useQuizStore = create((set) => ({
  isOpen: false,
  question: null,
  questions: questions,
  openQuizModal: (question) => set({ isOpen: true, question }),
  closeQuizModal: () => set({ isOpen: false, question: null }),
  setQuestionDone: (questionId) => set((state) => ({
    question: state.question && state.question.id === questionId 
      ? { ...state.question, isDone: true } 
      : state.question,
  })),
}));
