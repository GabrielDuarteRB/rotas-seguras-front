'use client';

import { useEffect, useState } from 'react';
import ViaturaService from '@/services/ViaturaService';
import { ViaturaInterface } from '@/interface/Viatura/ViaturaInterface';

export default function ViaturasPage() {
  const [viaturas, setViaturas] = useState<ViaturaInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchViaturas = async () => {
      try {
        const data = await ViaturaService.getAll();
        setViaturas(data);
      } catch (error) {
        console.error('Erro ao buscar viaturas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchViaturas();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Viaturas</h1>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul className="space-y-2">
          {viaturas.map((v) => (
            <li
              key={v.id_viatura}
              className="border rounded-xl p-4 shadow-md bg-white"
            >
              <p><strong>Placa:</strong> {v.placa}</p>
              <p><strong>Modelo:</strong> {v.modelo}</p>
              <p><strong>Ano:</strong> {v.ano}</p>
              <p><strong>Status:</strong> {v.status_viatura?.descricao ?? 'Desconhecido'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
