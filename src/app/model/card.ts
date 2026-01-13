/**
 * Interface que representa a estrutura de um Card.
 */
export interface Card {
  id?: number;
  /** Título do card */
  titulo: string;
  /** Descrição do card */
  descricao: string;
  /** URL ou Base64 do ícone */
  imagem: string;

  // Role deve corresponder ao Enum do backend
  role: 'ROLE_ABERTO' | 'ROLE_FINALIZADO' | 'ROLE_CANCELADO';
}
