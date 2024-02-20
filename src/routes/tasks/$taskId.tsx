import { beforeLoad } from '../../utils/beforeLoad';
import { createFileRoute } from '@tanstack/react-router';
// import { PostType } from '../posts';

// export const Route = createFileRoute('/tasks/$taskId')({
//   component: Task,
//   beforeLoad,
// });

export function Task() {
  return <div>Hello /tasks/$taskId!</div>;
}

type Task = { title: string; body: string };

export const Route = createFileRoute('/tasks/$taskId')({
  beforeLoad,
  loader: async ({ params }) => {
    console.log(`Fetching post with id ${params.taskId}...`);

    await new Promise((r) => setTimeout(r, Math.round(Math.random() * 300)));

    return fetch(
      `https://65cd3e7edd519126b8404907.mockapi.io/api/v1/todos/${params.taskId}`
    ).then((r) => r.json() as Promise<Task>);
  },
  component: TaskComponent,
});

function TaskComponent() {
  const post = Route.useLoaderData();

  return (
    <div className="space-y-2">
      <h4 className="text-xl font-bold underline">{post.title}</h4>
      <div className="text-sm">{post.body}</div>
    </div>
  );
}
