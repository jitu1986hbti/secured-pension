import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavigationState, ScreenName } from '../types';

const initialState: NavigationState = {
  currentScreen: 'Splash',
  history: [],
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    navigate: (state, action: PayloadAction<ScreenName>) => {
      if (state.currentScreen !== action.payload) {
        state.history.push(state.currentScreen);
        state.currentScreen = action.payload;
      }
    },
    goBack: (state) => {
      if (state.history.length > 0) {
        state.currentScreen = state.history.pop()!;
      }
    },
    resetNav: (state, action: PayloadAction<ScreenName>) => {
      state.currentScreen = action.payload;
      state.history = [];
    }
  }
});

export const { navigate, goBack, resetNav } = navigationSlice.actions;
export default navigationSlice.reducer;
