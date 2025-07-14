'use client';

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { StatusViaturaInterface } from '@/interface/Viatura/ViaturaInterface';
import StatusViaturaService from '@/services/StatusViaturaService';
import { FaTrashAlt, FaPlusCircle } from 'react-icons/fa';

export default function AdminStatusViaturaPage() {
  const [statusList, setStatusList] = useState<StatusViaturaInterface[]>([]);
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    const data = await StatusViaturaService.getAll();
    setStatusList(data);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!descricao.trim()) return;

    await StatusViaturaService.create({ descricao });
    setDescricao('');
    fetchStatus();
  };

  const handleDelete = async (id: number) => {
    await StatusViaturaService.delete(id);
    fetchStatus();
  };

  return (
    <div className="container">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Gerenciamento de Status de Viatura</h1>
        <p className="text-zinc-300 text-lg">Configure os status disponíveis para as viaturas</p>
      </div>

      
      <div className="rounded-xl border border-gray-700 p-6 mb-8 hover-lift card-gradient">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <span className="w-2 h-6 bg-primary rounded-full"></span>
          Cadastrar Novo Status
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={descricao}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDescricao(e.target.value)}
              placeholder="Descrição do status"
              className="w-full px-4 py-3 bg-zinc-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 transform hover:scale-105"
          >
            <FaPlusCircle /> Cadastrar
          </button>
        </form>
      </div>

      
      <div className="rounded-xl border border-gray-700 p-6 hover-lift card-gradient">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-6 bg-primary rounded-full"></span>
            Status Cadastrados
          </h2>
          <span className="bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/30">
            {statusList.length} status cadastrado{statusList.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[600px] rounded-xl border border-gray-700 bg-black/20">
            <table className="w-full text-base text-left rounded-xl overflow-hidden">
              <thead className="bg-zinc-800 text-white uppercase text-xs md:text-sm">
                <tr>
                  <th className="px-3 py-2 md:px-6 md:py-4">ID</th>
                  <th className="px-3 py-2 md:px-6 md:py-4">Descrição</th>
                  <th className="px-3 py-2 md:px-6 md:py-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {statusList.map((status) => (
                  <tr key={status.id_status_viatura} className="border-b border-gray-700 hover:bg-zinc-800/50 transition-colors">
                    <td className="px-3 py-2 md:px-6 md:py-4 text-white">{status.id_status_viatura}</td>
                    <td className="px-3 py-2 md:px-6 md:py-4 text-white">{status.descricao}</td>
                    <td className="px-3 py-2 md:px-6 md:py-4 flex justify-center">
                      <button
                        onClick={() => handleDelete(status.id_status_viatura)}
                        className="flex items-center gap-2 bg-error text-white px-4 py-2 rounded-lg font-medium hover:bg-error/90 transition-all duration-200"
                      >
                        <FaTrashAlt /> Remover
                      </button>
                    </td>
                  </tr>
                ))}
                {statusList.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center p-8 text-zinc-400">
                      <div className="text-6xl mb-4">📋</div>
                      <p className="text-lg">Nenhum status cadastrado ainda.</p>
                      <p className="text-sm mt-2">Crie o primeiro status usando o formulário acima!</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
