import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "in-progress" | "completed";
  chat: any[];
  perQuestionScores: any[];
  finalScore?: number;
  summary?: string;
}

interface State { byId: Record<string, Candidate>; allIds: string[]; }
const initialState: State = { byId: {}, allIds: [] };

const slice = createSlice({
  name: "candidates",
  initialState,
  reducers: {
    addCandidate(state, action: PayloadAction<Candidate>) {
      state.byId[action.payload.id] = action.payload;
      state.allIds.push(action.payload.id);
    },
    updateCandidate(state, action: PayloadAction<Partial<Candidate> & { id: string }>) {
      Object.assign(state.byId[action.payload.id], action.payload);
    },
  },
});

export const { addCandidate, updateCandidate } = slice.actions;
export default slice.reducer;
