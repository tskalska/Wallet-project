import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

toast.configure();
const toastMessage = errorMessage => {
  toast.error(errorMessage, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
  });
};

const toastSuccess = successMessage => {
  toast.success(successMessage, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
  });
};

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (transactionsLength) => {
    try {
      // const { data } = await axios.get(`/transactions`);

      // const { data } = await axios.get(`/transactions?TasksPerPage=6&pageToSkip=${pageNumber}`);
      const { data } = await axios.get('/transactions', {
        params: {
          tasksPerPage: 6,
          transactionsToSkip: transactionsLength
        }
      });

      // let newPage = page;

      // if (data.data.transactions.length) {
      //   newPage++;
      // }
      
      return {transactions: data.data.transactions};
    } catch (error) {
      alert('Your session has timed out. Please login again!');
    }
  },
);

export const addTransaction = createAsyncThunk(
  'transactions/addTransaction',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/transactions', payload.transaction);
      toastSuccess('Transaction added!');
      return {...data, nameStatistics: payload.categoryToState.nameStatistics, nameDropdown: payload.categoryToState.nameDropdown};
    } catch (error) {
      if (error.response.status === 404) {
        toastMessage('Oops... Something went wrong');
      } else if (error.response.status === 409) {
        toastMessage('Not enough funds');
      } else if (error.response.status === 400) {
        toastMessage('Incorrectly completed form');
      } else {
        console.log(error);
      }
      return rejectWithValue(error);
    }
  },
);


