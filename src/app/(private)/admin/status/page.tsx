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
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-xl mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Gerenciar Status de Viatura
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8"
      >
        <input
          type="text"
          value={descricao}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDescricao(e.target.value)}
          placeholder="Descrição do status"
          className="p-3 border border-gray-600 rounded-md w-64 bg-white/90 text-black"
          required
        />

        <button
          type="submit"
          className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-all"
        >
          <FaPlusCircle /> Cadastrar
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-center border-collapse rounded overflow-hidden">
          <thead className="bg-gray-800 text-white uppercase">
            <tr>
              <th className="p-3 border border-gray-700">ID</th>
              <th className="p-3 border border-gray-700">Descrição</th>
              <th className="p-3 border border-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            {statusList.map((status) => (
              <tr key={status.id_status_viatura} className="bg-gray-900 hover:bg-gray-800 transition">
                <td className="p-3 border border-gray-800">{status.id_status_viatura}</td>
                <td className="p-3 border border-gray-800">{status.descricao}</td>
                <td className="p-3 border border-gray-800">
                  <button
                    onClick={() => handleDelete(status.id_status_viatura)}
                    className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                  >
                    <FaTrashAlt /> Remover
                  </button>
                </td>
              </tr>
            ))}
            {statusList.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center p-4 text-gray-400 italic bg-gray-900">
                  Nenhum status cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
