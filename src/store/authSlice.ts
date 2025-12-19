import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  pendingEmail: string | null;
}

const initialState: AuthState = {
  pendingEmail: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPendingEmail(state, action: PayloadAction<string | null>) {
      state.pendingEmail = action.payload;
    },
    clearPendingEmail(state) {
      state.pendingEmail = null;
    },
  },
});

export const { setPendingEmail, clearPendingEmail } = authSlice.actions;
export default authSlice.reducer;
