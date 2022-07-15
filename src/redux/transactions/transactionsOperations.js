import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
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
  async (page) => {
    try {
      // const { data } = await axios.get(`/transactions`);

      // const { data } = await axios.get(`/transactions?TasksPerPage=6&pageToSkip=${pageNumber}`);
      const { data } = await axios.get('/transactions', {
        params: {
          tasksPerPage: 6,
          pageToSkip: page-1
        }
      });

      return data.data.transactions;
    } catch (error) {
      alert('Your session has timed out. Please login again!');
    }
  },
);

// export const fetchTransactions = createAsyncThunk(
//   'transactions/fetchTransactions',
//   async (_, thunkAPI, pageSize, page) => {
//     try {
//       const { data } = await axios.get('/transactions').limit(pageSize).skip(pageSize * page);
//       console.log("тут")

//       return data.data.transactions;
//     } catch (error) {
//       alert('Your session has timed out. Please login again!');
//     }
//   },
// );

export const addTransaction = createAsyncThunk(
  'transactions/addTransaction',
  async (transaction, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/transactions', transaction);
      toastSuccess('Транзакция добавлена!');
      return data;
    } catch (error) {
      if (error.response.status === 404) {
        toastMessage('Упс... Что-то пошло не так');
      } else if (error.response.status === 409) {
        toastMessage('Недостаточно средств');
      } else if (error.response.status === 400) {
        toastMessage('Неверно заполненная форма');
      } else {
        console.log(error);
      }
      return rejectWithValue(error);
    }
  },
);


