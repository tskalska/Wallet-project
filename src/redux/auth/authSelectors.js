const getIsLoggedIn = (state) => state.auth.isAuth;
const getLoading = (state) => state.auth.isLoading;

const getUserName = (state) => state.auth.user.name;

const getIsFetchingCurrent = (state) => state.auth.isFetchingCurrentUser;

const checkToken = (state) => state.auth.token;

const getBalance = (state) => state.auth.user.balance;

const authSelectors = {
  getIsLoggedIn,
  getUserName,
  getIsFetchingCurrent,
  checkToken,
  getBalance,
  getLoading,
};

export default authSelectors;
