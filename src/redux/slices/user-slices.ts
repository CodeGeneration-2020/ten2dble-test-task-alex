import { createSlice } from "@reduxjs/toolkit";

import { IInitialState } from "./user-slices.types";

const initialState: IInitialState = {
  avgScore: 0,
  totalScore: 0,
  countTries: 0
}

const userSlice = createSlice({
  name: 'score-slice',
  initialState,
  reducers: {
    updateAvg: (state, actions) => {
      console.log(actions)
      state.totalScore += actions.payload.score
      state.countTries += actions.payload.tries
      state.avgScore += 100 * state.totalScore / state.countTries
    }
  }
})

export const {updateAvg} = userSlice.actions
export default userSlice.reducer