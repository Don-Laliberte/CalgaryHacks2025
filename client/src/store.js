import {create} from "zustand";
import { backendaxios } from "./lib/backendaxios";
import { questions } from "./data/quizQuestions";
const useLogin = create((set) => {
    isLoggedIn: false
    login: () => set((state) => ({}))
    logout: () => set((state) => ({isLoggedIn: false}))
})

export const useImageStore = create((set) => ({
  isImageOpen: false,
  currentMessage: null, // Store the active message

  openImageModal: (message) => set({ isImageOpen: true, currentMessage: message }),
  closeImageModal: () => set({ isImageOpen: false, currentMessage: null }),
}));

export const useQuestionStore = create((set) => ({
  isVisible: false,
  showMessage: () => set({ isVisible: true }),
  hideMessage: () => set({ isVisible: false })
}));

export const useQuizStore = create((set) => ({
  isOpen: false,
  currentQuestion: null, // Store the active question
  questions:questions,

  openQuizModal: (question) => set({ isOpen: true, currentQuestion: question }),
  closeQuizModal: () => set({ isOpen: false, currentQuestion: null }),
  setQuestionDone: (questionId) => set((state) => ({
    questions: state.questions.map(q => 
      q.id === questionId ? { ...q, isDone: true } : q
    ),
  })),
}));
