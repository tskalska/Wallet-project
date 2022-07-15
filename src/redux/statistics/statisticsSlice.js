import { createSlice } from "@reduxjs/toolkit";
import getStatistics from "./statisticsOperation";
  
  const statisticsSlice = createSlice({
      name: 'statistics',
      initialState: { 
          data: [], 
          isLoading: false, 
          error: null
    },
      extraReducers: {
        [getStatistics.fulfilled]: (state, { payload }) => {
           state.data = payload
           state.isLoading = false;
           state.error = false
        },
        [getStatistics.pending]: state => {
          state.isLoading = true;
        },
        [getStatistics.rejected]: () => state => {
          state.data = [];
          state.loading = false;
          state.hasError = true;
        }
    }    
  })
  export default statisticsSlice.reducer;