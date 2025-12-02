import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private tokenKey = 'auth_token';
    private usersKey = 'registered_users';

    constructor() { }

    /**
     * Simulates a login API call.
     * @param email User email
     * @param password User password
     * @returns Observable<boolean>
     */
    login(email: string, password: string): Observable<boolean> {
        return new Observable(observer => {
            setTimeout(() => {
                const users = this.getUsers();
                const user = users.find(u => u.email === email && u.password === password);

                if (user) {
                    localStorage.setItem(this.tokenKey, 'fake-jwt-token-' + Math.random());
                    observer.next(true);
                    observer.complete();
                } else {
                    observer.error(new Error('Credenciais inválidas'));
                }
            }, 1500);
        });
    }

    /**
     * Registers a new user.
     * @param user User object
     * @returns Observable<boolean>
     */
    register(user: any): Observable<boolean> {
        return new Observable(observer => {
            setTimeout(() => {
                const users = this.getUsers();
                if (users.find(u => u.email === user.email)) {
                    observer.error(new Error('Email já cadastrado'));
                    return;
                }

                users.push(user);
                localStorage.setItem(this.usersKey, JSON.stringify(users));
                observer.next(true);
                observer.complete();
            }, 1000);
        });
    }

    private getUsers(): any[] {
        const users = localStorage.getItem(this.usersKey);
        return users ? JSON.parse(users) : [];
    }

    /**
     * Logs the user out by removing the token.
     */
    logout(): void {
        localStorage.removeItem(this.tokenKey);
    }

    /**
     * Checks if the user is logged in.
     * @returns boolean
     */
    isLoggedIn(): boolean {
        return !!localStorage.getItem(this.tokenKey);
    }
}
