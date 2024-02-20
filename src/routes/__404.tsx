import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/__404')({
  component: () => <div>Hello /__404</div>,
});
