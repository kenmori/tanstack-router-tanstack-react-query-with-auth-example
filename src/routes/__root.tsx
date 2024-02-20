import {
  createRootRouteWithContext,
  Link,
  Outlet,
  useNavigate,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { QueryClient } from '@tanstack/react-query';
import { useAuth, AuthContextType } from '/src/auth';
import { beforeLoad } from '/src/utils/beforeLoad';

export interface RouterContext {
  queryClient: QueryClient;
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad,
  component: RootComponent,
});

function RootComponent() {
  const auth = useAuth();
  const navigate = useNavigate({ from: '/' });
  return (
    <>
      <div style={{ border: '1px solid red' }}>
        <div style={{ color: 'red' }}>root layout</div>
        <div>
          {auth.isAuthenticated ? (
            <div>
              {auth.user} ログイン中 :
              <button
                onClick={() => {
                  auth.setUser(null);
                  navigate({ to: '/' });
                }}
              >
                ログアウト
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                auth.setUser('kenji');
                navigate({ to: '/' });
              }}
            >
              ログインする
            </button>
          )}
        </div>
        <div className="p-2 flex gap-2">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{' '}
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>{' '}
          <Link to="/tasks" className="[&.active]:font-bold">
            Tasks
          </Link>{' '}
          <Link
            params={{}}
            to="/tasks/$taskId"
            className="[&.active]:font-bold"
          >
            Task詳細
          </Link>{' '}
        </div>
        <hr />
        <Outlet />
        {/* <ReactQueryDevtools buttonPosition="top-right" /> */}
        <TanStackRouterDevtools />
      </div>
    </>
  );
}
