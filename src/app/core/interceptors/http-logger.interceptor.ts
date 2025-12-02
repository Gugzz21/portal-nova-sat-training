import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export const httpLoggerInterceptor: HttpInterceptorFn = (req, next) => {
    const startTime = Date.now();
    console.log(`[Requisição HTTP] ${req.method} ${req.url}`);

    return next(req).pipe(
        tap({
            next: (event) => {
            },
            error: (error) => {
                const duration = Date.now() - startTime;
                console.warn(`[Erro HTTP] ${req.method} ${req.url} - Status: ${error.status} - Duração: ${duration}ms`);
            },
            finalize: () => {
                const duration = Date.now() - startTime;
                console.log(`[Resposta HTTP] ${req.method} ${req.url} - Duração: ${duration}ms`);
            }
        })
    );
};
