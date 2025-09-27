import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SessionState {
  currentCandidateId: string | null;
  timerRemaining: number;
}

const initialState: SessionState = { currentCandidateId: null, timerRemaining: 0 };

const slice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setCandidate(state, action: PayloadAction<string>) {
      state.currentCandidateId = action.payload;
    },
    setTimer(state, action: PayloadAction<number>) {
      state.timerRemaining = action.payload;
    },
    decrementTimer(state) {
      if (state.timerRemaining > 0) state.timerRemaining -= 1;
    },
  },
});

export const { setCandidate, setTimer, decrementTimer } = slice.actions;
export default slice.reducer;
