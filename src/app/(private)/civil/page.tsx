'use client'

import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { CardOption } from '@/components/Card/Option'

export default function PrivateCivil() {
  const authContext = useContext(AuthContext)

  if(!authContext) return null

  const { user, loading } = authContext

  return (
    <div className="container">
      
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">Bem-vindo às Rotas Seguras, {user?.nome}!</h1>
        <p className="text-zinc-300 text-lg">Acesse as funcionalidades disponíveis para civis no sistema de segurança.</p>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
        <CardOption
          title="Ocorrências"
          paragraph="Caso tenha acontecido algo com você, crie uma ocorrência para podermos ajudar o mais rápido possível"
          buttonText="Ocorrências"
          buttonLink="/civil/ocorrencia"
        />
        <CardOption
          title="Postos de Guarda"
          paragraph="Veja os postos de guarda cadastrados."
          buttonText="Postos"
          buttonLink="/civil/posto"
        />
        <CardOption
          title="Policiais"
          paragraph="Veja uma lista de todos os policiais, ativos ou não ativos."
          buttonText="Policiais"
          buttonLink="/civil/policial"
        />
        <CardOption
          title="Postos Policiais"
          paragraph="Visualize os postos policiais cadastrados no sistema."
          buttonText="Postos Policiais"
          buttonLink="/civil/posto-policial"
        />
        <CardOption
          title="Viaturas"
          paragraph="Visualize as viaturas disponíveis no sistema."
          buttonText="Viaturas"
          buttonLink="/civil/viaturas"
        />
      </div>
    </div>
  )
}