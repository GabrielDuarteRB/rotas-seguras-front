'use client'

import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { CardOption } from '@/components/Card/Option'

export default function PrivateCivil({
  children,
}: {
  children: React.ReactNode
}) {
  const authContext = useContext(AuthContext)

  if(!authContext) return null

  const { user, loading } = authContext

  return (
    <div>
      <h1 className="text-primary text-2xl font-bold">Bem vindo a rotas seguras, {user?.nome}!</h1>
      <div className="flex mt-16">
        <CardOption
          title="Ocorrencias"
          paragraph="Caso tenha acontecido algo com voce, crie uma ocorrencia para podermos ajudar o mais rapido possivel"
          buttonText="Ocorrencias"
          buttonLink="/civil/ocorrencia"
        />
      </div>
    </div>
  )
}