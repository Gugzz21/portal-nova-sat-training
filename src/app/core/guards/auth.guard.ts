import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

    const authService = inject(AuthService);
    const router = inject(Router);

    // Verifica se o usuário está logado
    if (!authService.isLoggedIn()) {
        // Redireciona para o login se não estiver autenticado
        router.navigate(['/login']);
        return false;
    }

    // Checa roles caso a rota tenha data.roles definido
    const requiredRoles = route.data?.['roles'] as string[] | undefined;
    if (requiredRoles && requiredRoles.length > 0) {
        const allowed = authService.hasAnyRole(requiredRoles);
        if (!allowed) {
            // Usuário autenticado, mas sem permissão: redireciona        if (!allowed) {
            const userRoles = authService.getUserRoles();

            // Usuário autenticado, mas sem permissão: redireciona para cards para evitar loop
            router.navigate(['/cards']);
            return false;
        }
    }

    return true;
};
