import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface DriversState {
  page: number;
}

const initialState: DriversState = {
  page: 1,
};

export const driversSlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setPage: (state: DriversState, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const {setPage} = driversSlice.actions;

export default driversSlice.reducer;
