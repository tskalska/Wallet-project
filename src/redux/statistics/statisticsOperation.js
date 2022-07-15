import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = `http://localhost:3001/api`;

const getStatistics = createAsyncThunk(
  "statistics/fetchStatistics",
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const statistics = await axios.get("/transactions/statistics", {
        params: { month, year },
      });
      const { data } = statistics;
      if (data.length > 0) {
        const expenses = data.filter((statistic) => !statistic.income)[0];
        const income = data.filter((statistic) => statistic.income)[0];

        return { expenses, income };
      }
      return { expenses: {}, income: {} };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default getStatistics;
