import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const token = localStorage.getItem('token');

    // Lista de URLs que não precisam de token
    const publicUrls = [
        '/usuario/login',
        '/usuario/criar'
    ];

    // Verifica se a URL da requisição é pública
    const isPublicUrl = publicUrls.some(url => req.url.includes(url));

    console.log(`[AuthInterceptor] URL: ${req.url}, IsPublic: ${isPublicUrl}, Token found: ${!!token}`);

    if (token && !isPublicUrl) {
        console.log('[AuthInterceptor] Attaching token to request');
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    } else if (!token && !isPublicUrl) {
        console.warn('[AuthInterceptor] Requesting protected URL without token!');
    }

    return next(req).pipe(
        catchError((error) => {
            // Se receber 401 ou 403, pode redirecionar para login ou limpar token
            if (error.status === 401 || error.status === 403) {
                // Opcional: localStorage.removeItem('token');
                // router.navigate(['/login']);
            }
            return throwError(() => error);
        })
    );
};
