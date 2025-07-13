'use client';

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import PostoPolicialService from '@/services/PostoPolicialService';
import { PostoPolicialInterface } from '@/interface/PostoPolicial/PostoPolicialInterface';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function AdminPostoPolicialPage() {
  const [postos, setPostos] = useState<PostoPolicialInterface[]>([]);
  const [postoNome, setPostoNome] = useState('');
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [filtroPosto, setFiltroPosto] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await PostoPolicialService.getAll();
    setPostos(data);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postopolicialData = { posto: postoNome };

    if (editandoId) {
      await PostoPolicialService.update(editandoId, postopolicialData);
    } else {
      await PostoPolicialService.create(postopolicialData);
    }
    resetForm();
    fetchData();
  };

  const resetForm = () => {
    setPostoNome('');
    setEditandoId(null);
  };

  const handleEdit = (posto: PostoPolicialInterface) => {
    setPostoNome(posto.posto);
    setEditandoId(posto.id_posto);
  };

  const handleFiltrar = async () => {
    try {
      if (filtroPosto.trim() !== '') {
        const data = await PostoPolicialService.getAll();
        const filtrado = data.filter((p) =>
          p.posto.toLowerCase().includes(filtroPosto.toLowerCase())
        );
        setPostos(filtrado);
      } else {
        fetchData();
      }
    } catch (error) {
      console.error('Erro ao filtrar:', error);
    }
  };

  const limparFiltro = () => {
    setFiltroPosto('');
    fetchData();
  };

  return (
    <div className="bg-gray-900 text-white p-8 rounded-xl shadow-xl max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Gerenciar Postos Policiais</h1>

      {/* FORM CADASTRO / EDIÇÃO */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 items-end"
      >
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-white">Nome do Posto</label>
          <input
            type="text"
            value={postoNome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPostoNome(e.target.value)}
            className="p-2 border border-gray-600 rounded bg-white/90 text-black"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-teal-600 text-white p-2 rounded hover:bg-teal-700 transition"
        >
          {editandoId ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>

      {/* FILTRO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex flex-col md:col-span-2">
          <label className="mb-1 text-sm font-medium text-white">Filtrar por Nome do Posto</label>
          <input
            type="text"
            value={filtroPosto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFiltroPosto(e.target.value)}
            className="p-2 border border-gray-600 rounded bg-white/90 text-black"
          />
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

      {/* TABELA */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm text-center rounded overflow-hidden">
          <thead className="bg-gray-800 text-white uppercase">
            <tr>
              <th className="px-4 py-2 border border-gray-700">ID</th>
              <th className="px-4 py-2 border border-gray-700">Posto</th>
              <th className="px-4 py-2 border border-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            {postos.map((posto) => (
              <tr key={posto.id_posto} className="bg-gray-900 hover:bg-gray-800 transition">
                <td className="px-4 py-2 border border-gray-800">{posto.id_posto}</td>
                <td className="px-4 py-2 border border-gray-800">{posto.posto}</td>
                <td className="px-4 py-2 border border-gray-800 flex justify-center gap-4">
                  <button
                    onClick={() => handleEdit(posto)}
                    className="text-blue-400 hover:text-blue-600"
                    title="Editar"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => PostoPolicialService.delete(posto.id_posto).then(fetchData)}
                    className="text-red-500 hover:text-red-700"
                    title="Remover"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
