'use client';

import { CardOption } from '@/components/Card/Option'

export default function AdminHomePage() {
  return (
    <div className="container">
      
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">Bem-vindo, Administrador</h1>
        <p className="text-secondary text-lg">Gerencie usuários, ocorrências e viaturas com acesso total ao sistema.</p>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
        <CardOption
          title="Ocorrências"
          paragraph="Caso tenha acontecido algo com você, crie uma ocorrência para podermos ajudar o mais rápido possível"
          buttonText="Ocorrências"
          buttonLink="/admin/ocorrencia"
        />
        <CardOption
          title="Viaturas"
          paragraph="Gerencie e cadastre viaturas no sistema."
          buttonText="Viaturas"
          buttonLink="/admin/viaturas"
        />
        <CardOption
          title="Status Viatura"
          paragraph="Adicione, edite ou remova status disponíveis para viaturas."
          buttonText="Status Viatura"
          buttonLink="/admin/status"
        />
        <CardOption
          title="Posto de Guarda"
          paragraph="Veja os postos de guarda cadastrados."
          buttonText="Posto de Guarda"
          buttonLink="/admin/posto"
        />
        <CardOption
          title="Policial Viatura"
          paragraph="Adicione ou edite quais policiais estão em cada viatura."
          buttonText="Policial Viatura"
          buttonLink="/admin/policial-viatura"
        />
        <CardOption
          title="Policial"
          paragraph="Veja uma lista de todos os policiais, ativos ou não ativos."
          buttonText="Policial"
          buttonLink="/admin/policial"
        />     
        <CardOption
          title="Posto Policial"
          paragraph="Visualize os postos policiais cadastrados no sistema."
          buttonText="Posto Policial"
          buttonLink="/admin/posto-policial"
        />           
      </div>
    </div>
  );
}