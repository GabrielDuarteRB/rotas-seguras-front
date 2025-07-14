'use client';

import { CardOption } from '@/components/Card/Option'

export default function PolicialHomePage() {
  return (
    <div className="container">
      
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">Bem-vindo, Policial</h1>
        <p className="text-zinc-300 text-lg">Visualize e acompanhe ocorrências e viaturas atribuídas à sua região.</p>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
        <CardOption
          title="Ocorrências"
          paragraph="Caso tenha acontecido algo com você, crie uma ocorrência para podermos ajudar o mais rápido possível"
          buttonText="Ocorrências"
          buttonLink="/policial/ocorrencia"
        />
        <CardOption
          title="Viaturas"
          paragraph="Gerencie e cadastre viaturas no sistema."
          buttonText="Viaturas"
          buttonLink="/policial/viaturas"
        />
        <CardOption
          title="Policial"
          paragraph="Veja uma lista de todos os policiais, ativos ou não ativos."
          buttonText="Policial"
          buttonLink="/policial/policial"
        />     
        <CardOption
          title="Posto Policial"
          paragraph="Visualize os postos policiais cadastrados no sistema."
          buttonText="Posto Policial"
          buttonLink="/policial/posto-policial"
        />           
      </div>
    </div>
  );
}