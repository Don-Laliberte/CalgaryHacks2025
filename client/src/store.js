import {create} from "zustand";
import { backendaxios } from "./lib/backendaxios";
import { questions } from "./data/quizQuestions";
const useLogin = create((set) => {
    isLoggedIn: false
    login: () => set((state) => ({}))
    logout: () => set((state) => ({isLoggedIn: false}))
})

const useInfoStore = create((set) => ({
  isVisible: false,
  currentMessage: '',
  setMessage: (message) => set({ isVisible: true, currentMessage: message }),
  hideMessage: () => set({ isVisible: false, currentMessage: '' }),
}));

export { useInfoStore };

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
    questions: state.questions.map(q => 
      q.id === questionId ? { ...q, isDone: true } : q
    ),
  })),
}));
