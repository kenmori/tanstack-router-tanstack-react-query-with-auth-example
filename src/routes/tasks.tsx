import { queryOptions } from '@tanstack/react-query';
import {
  Link,
  Outlet,
  createFileRoute,
  redirect,
} from '@tanstack/react-router';

async function fetchTasks() {
  const data = await fetch(
    'https://65cd3e7edd519126b8404907.mockapi.io/api/v1/todos'
  );
  const json = await data.json();
  return json;
}

const tasksQueryOptions = queryOptions({
  queryKey: ['tasks'],
  queryFn: () => fetchTasks(),
});

export const Route = createFileRoute('/tasks')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  loader: ({ context: { queryClient, auth } }) => {
    console.log(auth);
    return queryClient.ensureQueryData(tasksQueryOptions);
  },
  component: TasksComponent,
});

function TasksComponent() {
  const tasks = Route.useLoaderData();
  return (
    <div className="display-flex">
      <ul>
        {tasks.map((e: any) => {
          return (
            <li key={e.id} className="whitespace-nowrap">
              <Link
                to="/tasks/$taskId"
                params={{
                  taskId: e.id,
                }}
                className="block py-1 text-blue-800 hover:text-blue-600"
                activeProps={{ className: 'text-black font-bold' }}
              >
                <div>{e.title.substring(0, 20)}</div>
              </Link>
            </li>
          );
        })}
      </ul>
      <hr />
      <Outlet />
    </div>
  );
}
