import { redirect } from '@tanstack/react-router';
import { RouterContext } from '../types';

export function beforeLoad({
  context,
  location,
}: {
  context: RouterContext;
  location: any;
}) {
  if (!context.auth.isAuthenticated) {
    throw redirect({
      to: '/login',
      search: {
        redirect: location.href,
      },
    });
  }
}
