'use client'

import tipoOcorrenciaOptions from '@/constants/tipoOcorrencia'
import statusOcorrenciaOptions from '@/constants/statusOcorrencia'
import { getLabelByValue } from '@/utils/getLabelByValue'

interface OcorrenciaCardProps {
  descricao: string
  id_tipo_ocorrencia: string | number
  id_status_ocorrencia: string | number
  criada_em?: string
}

export function CardOcorrencia({
  descricao,
  id_tipo_ocorrencia,
  id_status_ocorrencia,
  criada_em,
}: OcorrenciaCardProps) {
  return (
    <div className="bg-default border rounded-xl shadow-sm p-4 w-full w-250 hover:shadow-md transition-all z-3">
      <div className="flex justify-between items-center mb-2">
        <span className="text-md text-terciary uppercase">
          {getLabelByValue(tipoOcorrenciaOptions, id_tipo_ocorrencia)}
        </span>
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full bg-foreground ${
            id_status_ocorrencia === '1'
              ? 'text-error'
              : id_status_ocorrencia === '3'
              ? 'text-success'
              : 'text-warning'
          }`}
        >
          {getLabelByValue(statusOcorrenciaOptions, id_status_ocorrencia)}
        </span>
      </div>

      <p className="text-sm text-terciary mb-3">{descricao}</p>

      {criada_em && (
        <p className="text-xs text-terciary">
          Criada em: {new Date(criada_em).toLocaleString('pt-BR')}
        </p>
      )}
    </div>
  )
}
