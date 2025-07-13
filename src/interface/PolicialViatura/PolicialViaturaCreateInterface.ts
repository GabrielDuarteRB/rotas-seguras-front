export interface PolicialViaturaCreateInterface {
  id_viatura: number;
  matricula_policial: number;
  ativado_em: string; // ISO string format
  devolvido_em: string | null; // ISO string format ou null
}
