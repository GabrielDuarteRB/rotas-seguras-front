'use client'

import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'

export default function PrivateCivil({
  children,
}: {
  children: React.ReactNode
}) {
  const authContext = useContext(AuthContext)

  if(!authContext) return null

  const { user, loading } = authContext

  return (
    <html lang="pt-br">
      <body className="flex">
        <h1 className="text-primary text-2xl font-bold">Bem vindo a rotas seguras, {user?.nome}!</h1>
      </body>
    </html>
  )
}