export interface User {
  id?: number;
  nome: string;
  senha?: string; // Opcional pois no response não vem senha
  email: string;
  token?: string;
}