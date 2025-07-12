'use client'

import { useContext, useEffect, useState } from 'react'
import { ButtonPrimary } from '@/components/Button/Primary'
import { TableOcorrencia } from '@/components/Table/Ocorrencia'
import { ModalCreateOcorrencia } from '@/components/Modal/CreateOcorrencia'
import { ModalEditOcorrencia } from '@/components/Modal/EditOcorrencia'
import { AuthContext } from '@/context/AuthContext'
import { OcorrenciaContext } from '@/context/OcorrenciaContext'
import { OcorrenciaInterface } from '@/interface/Ocorrencia/OcorrenciaInterface'

export default function PrivateAdminOcorrencia({
  children,
}: {
  children: React.ReactNode
}) {
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
    <div className="flex flex-col p-6">
      <h1 className="text-primary text-2xl font-bold">Ocorrências</h1>
      <p className="text-primary text-lg font-medium mt-4">
        {!ocorrencias || ocorrencias.length === 0
          ? 'Nenhuma ocorrência encontrada. Crie a primeira!'
          : `${ocorrencias.length} encontradas`}
      </p>

      <div className="mt-6 w-fit">
        <ButtonPrimary onClick={() => setModalOpen(true)}>
          Criar Ocorrência
        </ButtonPrimary>
      </div>

      <div className="mt-10">
        {ocorrencias && ocorrencias.length > 0 && (
          <TableOcorrencia
            ocorrencias={ocorrencias}
            isAdmin={true}
            onOcorrenciaClick={handleAbrirEdicao}
          />
        )}
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
