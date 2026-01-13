import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, BehaviorSubject, of, throwError } from 'rxjs';
import { User } from '../model/user';
import { environment } from '../../enviroment';
@Injectable({
  providedIn: 'root',
})
export class UsuariosService {


  private apiUsuario = environment.apiUsuario;

  constructor(private http: HttpClient) { }

  criarUsuario(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUsuario}/criar`, user).pipe(catchError(this.errorHandler));
  }

  listarUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUsuario}/listar`).pipe(catchError(this.errorHandler));
  }

  listarUsuarioPorId(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUsuario}/listarPorId/${id}`).pipe(catchError(this.errorHandler));
  }

  atualizarUsuario(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUsuario}/atualizar/${user.id}`, user).pipe(catchError(this.errorHandler));
  }

  deletarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUsuario}/deletar/${id}`).pipe(catchError(this.errorHandler));
  }

  autenticarUsuario(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUsuario}/login`, user).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any): Observable<any> {
    console.error('Ocorreu um erro', error);
    return throwError(() => error);
  }




  //Esse é o antigo código que usava para simular dados.

  // private usersSubject = new BehaviorSubject<User[]>([]);
  // private nextId = 6; // Como temos 5 usuários iniciais, o próximo id é 6
  // private apiUrl = '/assets/data/users.json'; // URL para carregar dados iniciais

  // constructor(private http: HttpClient) {
  //   this.loadUsers();
  // }

  // private loadUsers(): void {
  //   this.http.get<User[]>(this.apiUrl).subscribe({
  //     next: (data) => {
  //       this.usersSubject.next(data);
  //     },
  //     error: (err) => {
  //       console.error('Erro ao carregar usuários:', err);
  //       // Inicializa com array vazio em caso de erro para evitar crash
  //       this.usersSubject.next([]);
  //     }
  //   });
  // }

  // // Obter usuários
  // getUsers(): Observable<User[]> {
  //   return this.usersSubject.asObservable();
  // }

  // // Adicionar usuário
  // addUser(user: Omit<User, 'id'>): Observable<User> {
  //   const currentUsers = this.usersSubject.value;
  //   const newUser: User = { ...user, id: this.nextId++ };

  //   // Simula uma chamada de API atualizando o estado local
  //   const updatedUsers = [...currentUsers, newUser];
  //   this.usersSubject.next(updatedUsers);

  //   return of(newUser);
  // }

  // // Atualizar usuário
  // updateUser(user: User): Observable<User> {
  //   const currentUsers = this.usersSubject.value;
  //   const index = currentUsers.findIndex(u => u.id === user.id);

  //   if (index !== -1) {
  //     const updatedUsers = [...currentUsers];
  //     updatedUsers[index] = user;
  //     this.usersSubject.next(updatedUsers);
  //     return of(user);
  //   }

  //   // Se não encontrar, retorna o usuário original ou lança erro (aqui apenas retornamos)
  //   return of(user);
  // }

  // // Deletar usuário
  // deleteUser(id: number): Observable<void> {
  //   const currentUsers = this.usersSubject.value;
  //   const updatedUsers = currentUsers.filter(u => u.id !== id);
  //   this.usersSubject.next(updatedUsers);
  //   return of(undefined);
  // }
}
