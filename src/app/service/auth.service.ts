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
}
