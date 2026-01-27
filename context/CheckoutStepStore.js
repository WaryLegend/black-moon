import { create } from "zustand";

const useCheckoutStepStore = create((set) => ({
  step: 1,
  maxStep: 3,

  setStep: (step) => set({ step }),

  nextStep: () =>
    set((state) => ({
      step: state.step < state.maxStep ? state.step + 1 : state.step,
    })),

  prevStep: () =>
    set((state) => ({
      step: state.step > 1 ? state.step - 1 : state.step,
    })),

  resetStep: () => set({ step: 1 }),
}));

export default useCheckoutStepStore;
