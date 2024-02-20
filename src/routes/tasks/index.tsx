import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/tasks/')({
  component: TaskIndexComponent,
});

function TaskIndexComponent() {
  return <div>Select a post.</div>;
}
