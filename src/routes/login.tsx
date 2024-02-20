import { createFileRoute, useNavigate } from '@tanstack/react-router';
// import { useAuth } from '../auth';

export const Route = createFileRoute('/login')({
  component: Login,
});

function Login() {
  // const auth = useAuth();
  // const navigate = useNavigate({ from: '/login' });
  return (
    <div className="p-2">
      <div>ログインページ</div>
    </div>
  );
}
