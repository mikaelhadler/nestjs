import { setupServer } from 'msw/node'
import { handlers } from '@/config/mocks/handlers'
 
export const mswServer = setupServer(...handlers)