'use client'

import { useState, useContext } from 'react'
import { OcorrenciaInterface } from '@/interface/Ocorrencia/OcorrenciaInterface'
import statusOcorrenciaOptions from '@/constants/statusOcorrencia'
import { Modal } from '@/components/Modal/Modal'
import { OcorrenciaContext } from '@/context/OcorrenciaContext'

interface ModalEditOcorrenciaProps {
  isOpen: boolean
  onClose: () => void
  ocorrencia: OcorrenciaInterface | null
}

export function ModalEditOcorrencia({
  isOpen,
  onClose,
  ocorrencia,
}: ModalEditOcorrenciaProps) {
  const ocorrenciaContext = useContext(OcorrenciaContext)

  if (!ocorrenciaContext) return null

  const [status, setStatus] = useState(ocorrencia?.id_status_ocorrencia || 2)

  if (!isOpen || !ocorrencia) return null
  const { updateOcorrencia } = ocorrenciaContext

  const handleSave = () => {
    try {
      updateOcorrencia(ocorrencia.id_ocorrencia, {
        id_status_ocorrencia: status,
      })
      console.log('Ocorrência atualizada com sucesso!')
      onClose()
    } catch (error) {
      console.error('Erro ao atualizar ocorrência:', error)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Ocorrencia!">
      <div >

        <p className="mb-2 text-zinc-700">
          <strong>ID:</strong> {ocorrencia.id_ocorrencia}
        </p>
        <p className="mb-4 text-zinc-700">
          <strong>Descrição:</strong> {ocorrencia.descricao}
        </p>

        <label className="block text-zinc-700 font-semibold mb-1">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded mb-4 text-zinc-800"
        >
          {statusOcorrenciaOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 mb-2 w-full rounded bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
          >
            Salvar
          </button>
        </div>
      </div>
    </Modal>
  )
}
