import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { httpLoggerInterceptor } from './core/interceptors/http-logger.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // Otimização de detecção de mudanças
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Configuração de rotas
    provideRouter(routes),
    // Cliente HTTP para requisições
    provideHttpClient(withInterceptors([httpLoggerInterceptor])),
    // Configuração de gráficos (ng2-charts)
    provideCharts(withDefaultRegisterables())
  ]
};
