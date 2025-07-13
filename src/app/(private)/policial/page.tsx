'use client';

import { CardOption } from '@/components/Card/Option'

export default function PolicialHomePage() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-primary">Bem-vindo, Policial</h1>
      <p className="mt-4 text-gray-600">Visualize e acompanhe ocorrências e viaturas atribuídas à sua região.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 justify-items-center">
        <CardOption
          title="Ocorrencias"
          paragraph="Caso tenha acontecido algo com voce, crie uma ocorrencia para podermos ajudar o mais rapido possivel"
          buttonText="Ocorrencias"
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