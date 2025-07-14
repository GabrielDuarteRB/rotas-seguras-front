'use client'

import { useContext, useEffect, useState } from 'react'
import { ButtonPrimary } from '@/components/Button/Primary'
import { TableOcorrencia } from '@/components/Table/Ocorrencia'
import { ModalCreateOcorrencia } from '@/components/Modal/CreateOcorrencia'
import { ModalEditOcorrencia } from '@/components/Modal/EditOcorrencia'
import { AuthContext } from '@/context/AuthContext'
import { OcorrenciaContext } from '@/context/OcorrenciaContext'
import { OcorrenciaInterface } from '@/interface/Ocorrencia/OcorrenciaInterface'

export default function PrivateAdminOcorrencia() {
  const authContext = useContext(AuthContext)
  const ocorrenciaContext = useContext(OcorrenciaContext)

  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [ocorrenciaSelecionada, setOcorrenciaSelecionada] =
    useState<OcorrenciaInterface | null>(null)

  if (!authContext || !ocorrenciaContext) return null

  const { user, loading } = authContext
  const { ocorrencia, ocorrencias, getOcorrencias } = ocorrenciaContext

  useEffect(() => {
    getOcorrencias()
  }, [ocorrencia])

  const handleAbrirEdicao = (ocorrencia: OcorrenciaInterface) => {
    setOcorrenciaSelecionada(ocorrencia)
    setEditModalOpen(true)
  }

  return (
    <div className="container">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Ocorrências</h1>
        <p className="text-zinc-300 text-lg">
          {!ocorrencias || ocorrencias.length === 0
            ? 'Nenhuma ocorrência encontrada. Crie a primeira!'
            : `${ocorrencias.length} ocorrência${ocorrencias.length !== 1 ? 's' : ''} encontrada${ocorrencias.length !== 1 ? 's' : ''}`}
        </p>
      </div>

      <div className="rounded-xl border border-gray-700 p-6 mb-8 hover-lift card-gradient">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-6 bg-primary rounded-full"></span>
            Gerenciamento de Ocorrências
          </h2>
          <ButtonPrimary onClick={() => setModalOpen(true)}>
            Criar Ocorrência
          </ButtonPrimary>
        </div>

        <div className="mt-6">
          {ocorrencias && ocorrencias.length > 0 && (
            <TableOcorrencia
              ocorrencias={ocorrencias}
              isAdmin={true}
              onOcorrenciaClick={handleAbrirEdicao}
            />
          )}
        </div>
      </div>

      {user?.id && (
        <ModalCreateOcorrencia
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          id_pessoa={user.id}
        />
      )}

      <ModalEditOcorrencia
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        ocorrencia={ocorrenciaSelecionada}
      />
    </div>
  )
}
