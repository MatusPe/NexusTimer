import { Solve } from "@/interfaces/Solve";
import { create } from "zustand";

interface DialogSolveProps {
  solve: Solve | null;
  isDialogSolveOpen: boolean;
  handleOpenDialogSolve: ({ solve }: { solve: Solve }) => void;
  handleCloseDialogSolve: () => void;
  handleSetSolveInDialog: ({ solve }: { solve: Solve | null }) => void;
}

export const useDialogSolve = create<DialogSolveProps>((set) => ({
  solve: null,
  isDialogSolveOpen: false,
  handleOpenDialogSolve: ({ solve }: { solve: Solve }) => {
    set({ isDialogSolveOpen: true, solve: solve });
  },
  handleCloseDialogSolve: () => {
    set({ isDialogSolveOpen: false, solve: null });
  },
  handleSetSolveInDialog: ({ solve }: { solve: Solve | null }) => {
    set({ solve: solve });
  },
}));
