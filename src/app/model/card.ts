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

  // Type was 'type' in frontend but 'role' in backend
  role?: 'image' | 'icon';
}
