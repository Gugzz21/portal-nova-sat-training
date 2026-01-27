import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UsuariosService } from './usuarios.service';
import { User } from '../model/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private tokenKey = 'token';

    constructor(private usuariosService: UsuariosService) { }

    /**
     * Realiza o login utilizando o UsuariosService.
     * @param email Email do usuário
     * @param password Senha do usuário
     * @returns Observable<boolean>
     */
    login(email: string, password: string): Observable<boolean> {
        // Cria um objeto User parcial apenas com email e senha para autenticação
        const user: User = { email, senha: password } as User;

        return this.usuariosService.autenticarUsuario(user).pipe(
            map(response => {
                // A verificação e salvamento do token já são feitos no UsuariosService
                // Aqui apenas retornamos true se o login foi bem sucedido (assumindo que se não lançou erro, foi sucesso)
                // Opcionalmente podemos verificar se o token está no localStorage
                return !!localStorage.getItem(this.tokenKey);
            })
        );
    }

    /**
     * Registra um novo usuário.
     * @param user Objeto do usuário
     * @returns Observable<User>
     */
    register(user: User): Observable<User> {
        return this.usuariosService.criarUsuario(user);
    }

    /**
     * Desloga o usuário removendo o token.
     */
    logout(): void {
        localStorage.removeItem(this.tokenKey);
    }

    /**
     * Verifica se o usuário está logado.
     * @returns boolean
     */
    isLoggedIn(): boolean {
        return !!localStorage.getItem(this.tokenKey);
    }

    /**
     * Decodifica o payload do JWT salvo no localStorage (se existir)
     */
    private getTokenPayload(): any | null {
        const token = localStorage.getItem(this.tokenKey);
        if (!token) return null;

        try {
            const parts = token.split('.');
            if (parts.length !== 3) return null;
            const payload = parts[1];
            const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
            return JSON.parse(decodeURIComponent(
                decoded.split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join('')
            ));
        } catch (e) {
            console.warn('[AuthService] Falha ao decodificar token', e);
            return null;
        }
    }

    /**
     * Retorna array de roles normalizadas (ex: ['ADMIN','USER'])
     */
    getUserRoles(): string[] {
        const payload = this.getTokenPayload();
        if (!payload) return [];

        // Possíveis campos onde backend pode retornar roles
        const rawRoles = payload.roles || payload.role || payload.authorities || payload.authority || null;

        let roles: string[] = [];

        if (Array.isArray(rawRoles)) {
            roles = rawRoles.map(r => String(r));
        } else if (typeof rawRoles === 'string') {
            // string separada por vírgula ou única
            roles = rawRoles.split(',').map(r => r.trim());
        }

        // Normalize: remove prefix ROLE_ e uppercase
        return roles.map(r => r.replace(/^ROLE_/i, '').toUpperCase());
    }

    hasAnyRole(requiredRoles: string[] = []): boolean {
        if (!requiredRoles || requiredRoles.length === 0) return true;
        const userRoles = this.getUserRoles();
        const normalizedRequired = requiredRoles.map(r => String(r).replace(/^ROLE_/i, '').toUpperCase());
        return normalizedRequired.some(req => userRoles.includes(req));
    }
}
