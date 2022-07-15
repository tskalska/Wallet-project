import { useSelector } from 'react-redux';
import { authSelectors } from './redux/auth';
import { Navigate } from 'react-router-dom';

export default function PublicRoute({
  children,
  redirectTo = '/',
  restricted = false,
}) {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return isLoggedIn ? <Navigate to={redirectTo} /> : children;
}
