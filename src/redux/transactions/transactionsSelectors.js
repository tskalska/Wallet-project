export const getTransactions = state => state.transactions.data;
export const isLoading = state => state.transactions.isLoading;
export const error = state => state.transactions.error;
export const getBalance = state => state.transactions.data.currentBalance;
