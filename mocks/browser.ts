import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Configuración del Service Worker para el browser
export const worker = setupWorker(...handlers);
