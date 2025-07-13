'use client'

import { useContext, useEffect, useState } from 'react'
import { ButtonPrimary } from '@/components/Button/Primary'
import { TableOcorrencia } from '@/components/Table/Ocorrencia'
import { ModalCreateOcorrencia } from '@/components/Modal/CreateOcorrencia'
import { AuthContext } from '@/context/AuthContext'
import { OcorrenciaContext } from '@/context/OcorrenciaContext'

export default function PrivateCivilOcorrencia() {
  const authContext = useContext(AuthContext)
  const ocorrenciaContext = useContext(OcorrenciaContext)
  const [modalOpen, setModalOpen] = useState(false)

  if (!authContext || !ocorrenciaContext) return null

  const { user, loading } = authContext
  const { ocorrencia, ocorrencias, getOcorrencias } = ocorrenciaContext

  useEffect(() => {
    if (user?.id) {
      getOcorrencias({ id_pessoa: user.id })
    }
  }, [user?.id, ocorrencia])

  return (
    <div className="flex flex-col p-6">
      <h1 className="text-primary text-2xl font-bold">Ocorrencias!</h1>
      <p className="text-primary text-1xl font-bold mt-5">
        {!ocorrencias || ocorrencias.length === 0
          ? "Nenhuma Ocorrencia encontrada. Crie sua primeira ocorrencia!"
          : `${ocorrencias.length} encontradas`}
      </p>
      <div className="w-50 mt-16">
        <ButtonPrimary onClick={() => setModalOpen(true)}>
          Criar Ocorrencia
        </ButtonPrimary>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {ocorrencias && ocorrencias.length > 0
          ?   <TableOcorrencia
                ocorrencias={ocorrencias}
              />
          : ''}
      </div>

      {user?.id && (
        <ModalCreateOcorrencia
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          id_pessoa={user.id}
        />
      )}
    </div>
  )
}
