'use client'

import { useContext, useEffect, useState } from 'react'
import { ButtonPrimary } from '@/components/Button/Primary'
import { CardOcorrencia } from '@/components/Card/Ocorrencia'
import { ModalCreateOcorrencia } from '@/components/Modal/CreateOcorrencia'
import { AuthContext } from '@/context/AuthContext'
import { OcorrenciaContext } from '@/context/OcorrenciaContext'

export default function PrivateCivil({
  children,
}: {
  children: React.ReactNode
}) {
  const authContext = useContext(AuthContext)
  const ocorrenciaContext = useContext(OcorrenciaContext)
  const [modalOpen, setModalOpen] = useState(false)

  if (!authContext || !ocorrenciaContext) return null

  const { user, loading } = authContext
  const { ocorrencias, getOcorrencias } = ocorrenciaContext

  useEffect(() => {
    if (user?.id) {
      getOcorrencias({ id_pessoa: user.id })
    }
  }, [user?.id])

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
          ? ocorrencias.map((ocorrencia) => (
              <CardOcorrencia
                key={ocorrencia.id_ocorrencia}
                descricao={ocorrencia.descricao}
                id_status_ocorrencia={ocorrencia.id_status_ocorrencia}
                id_tipo_ocorrencia={ocorrencia.id_tipo_ocorrencia}
                criada_em={ocorrencia.criada_em}
              />
            ))
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
