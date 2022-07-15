import { createAction } from '@reduxjs/toolkit';

export const fetchTransactionsRequst = createAction(
  'transactions/fetchTransactionsRequst',
);

export const fetchTransactionsSuccess = createAction(
  'transactions/fetchTransactionsSuccess',
);

export const fetchTransactionsError = createAction(
  'transactions/fetchTransactionsError',
);

export const deleteTransactionsRequst = createAction(
  'transactions/deleteTransactionsRequst',
);

export const deleteTransactionsSuccess = createAction(
  'transactions/deleteTransactionsSuccess',
);

export const deleteTransactionsError = createAction(
  'transactions/deleteTransactionsError',
);

export const filterTransactions = createAction(
  'transactions/filterTransactions',
);
