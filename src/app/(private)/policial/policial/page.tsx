'use client';

import { useEffect, useState, ChangeEvent } from 'react';
import PolicialService from '@/services/PolicialService';
import { PolicialInterface } from '@/interface/Policial/PolicialInterface';
import statusPolicial from '@/constants/statusPolicial';

export default function CivilPoliciaisPage() {
  const [policiais, setPoliciais] = useState<PolicialInterface[]>([]);

  const [filtroPosto, setFiltroPosto] = useState<number | ''>('');
  const [filtroAtivo, setFiltroAtivo] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await PolicialService.getAll();
    setPoliciais(data);
  };

  const handleFiltrar = async () => {
    try {
      if (filtroPosto && filtroAtivo !== '') {
        const data = await PolicialService.findByPosto(filtroPosto.toString());
        const filtrado = data.filter((p) => (filtroAtivo === '1' ? p.ativo : !p.ativo));
        setPoliciais(filtrado);
      } else if (filtroPosto) {
        const data = await PolicialService.findByPosto(filtroPosto.toString());
        setPoliciais(data);
      } else if (filtroAtivo !== '') {
        if (filtroAtivo === '1') {
          const data = await PolicialService.getPoliciaisAtivos();
          setPoliciais(data);
        } else {
          const todos = await PolicialService.getAll();
          const filtrado = todos.filter((p) => !p.ativo);
          setPoliciais(filtrado);
        }
      } else {
        fetchData();
      }
    } catch (error) {
      console.error('Erro ao filtrar:', error);
    }
  };

  const limparFiltro = () => {
    setFiltroPosto('');
    setFiltroAtivo('');
    fetchData();
  };

  return (
    <div className="bg-gray-900 text-white p-8 rounded-xl shadow-xl max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Lista de Policiais</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-white">Filtrar por Posto</label>
          <input
            type="number"
            value={filtroPosto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFiltroPosto(Number(e.target.value))}
            className="p-2 border border-gray-600 rounded bg-white/90 text-black"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-white">Filtrar por Status</label>
          <select
            value={filtroAtivo}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setFiltroAtivo(e.target.value)}
            className="p-2 border border-gray-600 rounded bg-white/90 text-black"
          >
            <option value="">Todos</option>
            {statusPolicial.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 mt-6">
          <button
            onClick={handleFiltrar}
            className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition flex-1"
          >
            Filtrar
          </button>
          <button
            onClick={limparFiltro}
            className="bg-gray-700 text-white p-2 rounded hover:bg-gray-800 transition flex-1"
          >
            Limpar
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm text-center rounded overflow-hidden">
          <thead className="bg-gray-800 text-white uppercase">
            <tr>
              <th className="px-4 py-2 border border-gray-700">ID</th>
              <th className="px-4 py-2 border border-gray-700">ID Pessoa</th>
              <th className="px-4 py-2 border border-gray-700">Posto</th>
              <th className="px-4 py-2 border border-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {policiais.map((policial) => (
              <tr key={policial.id_policial} className="bg-gray-900 hover:bg-gray-800 transition">
                <td className="px-4 py-2 border border-gray-800">{policial.id_policial}</td>
                <td className="px-4 py-2 border border-gray-800">{policial.id_pessoa}</td>
                <td className="px-4 py-2 border border-gray-800">{policial.posto}</td>
                <td className="px-4 py-2 border border-gray-800">
                  {policial.ativo ? 'Ativo' : 'Não Ativo'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
