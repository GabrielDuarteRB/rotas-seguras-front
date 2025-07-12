export interface StatusViaturaInterface {
  id_status_viatura: number;
  descricao: string;
}

export interface ViaturaInterface {
  id_viatura: number;
  placa: string;
  modelo: string;
  ano: number;
  id_status_viatura: number;
  status_viatura?: StatusViaturaInterface;
}
