export interface PolicialViaturaCreateInterface {
  id_viatura: number;
  matricula_policial: number;
  ativado_em: string; 
  devolvido_em: string | null; 
}
