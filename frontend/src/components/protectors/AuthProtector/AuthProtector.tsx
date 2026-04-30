import { selectIsUserAuthenticated } from '@/services/slices/auth';
import { useAppSelector } from '@/services/store';
import { Navigate, Outlet } from 'react-router';

interface IAuthProtector {
  isRedirectAuthorized: boolean;
  redirectPath: string;
  replace?: boolean;
}

export const AuthProtector = (props: IAuthProtector) => {
  const { isRedirectAuthorized, redirectPath, replace = true } = props;
  const isUserAuthenticated = useAppSelector(selectIsUserAuthenticated);

  if (isRedirectAuthorized === isUserAuthenticated) {
    return <Navigate to={redirectPath} replace={replace} />;
  }

  return <Outlet />;
};
