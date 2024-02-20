import { QueryClient } from '@tanstack/react-query';
import { AuthContextType } from '../auth';

export interface RouterContext {
  queryClient: QueryClient;
  auth: AuthContextType;
}
