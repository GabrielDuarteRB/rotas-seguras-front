export interface OcorrenciaCreateInterface {
  id_pessoa: number
  id_status_ocorrencia: number
  id_tipo_ocorrencia: number
  latitude: number
  longitude: number
  descricao: string
  criada_em?: string
  finalizado_em?: string
}