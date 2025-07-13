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
    <div className="container">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Gerenciamento de Postos Policiais</h1>
        <p className="text-secondary text-lg">Cadastre e gerencie os postos da corporação</p>
      </div>

      
      <div className="rounded-xl border border-gray-700 p-6 mb-8 hover-lift card-gradient">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <span className="w-2 h-6 bg-primary rounded-full"></span>
          {editandoId ? 'Editar Posto' : 'Cadastrar Novo Posto'}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="flex flex-col md:col-span-2">
            <label className="mb-1 text-sm font-medium text-white">Nome do Posto</label>
            <input
              type="text"
              value={postoNome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPostoNome(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 transform hover:scale-105"
          >
            {editandoId ? 'Atualizar' : 'Cadastrar'}
          </button>
        </form>
      </div>

      
      <div className="rounded-xl border border-gray-700 p-6 mb-8 hover-lift card-gradient">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <span className="w-2 h-6 bg-primary rounded-full"></span>
          Filtros
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="flex flex-col md:col-span-2">
            <label className="mb-1 text-sm font-medium text-white">Filtrar por Nome do Posto</label>
            <input
              type="text"
              value={filtroPosto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFiltroPosto(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleFiltrar}
              className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 flex-1"
            >
              Filtrar
            </button>
            <button
              onClick={limparFiltro}
              className="bg-zinc-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-zinc-600 transition-all duration-200 flex-1"
            >
              Limpar
            </button>
          </div>
        </div>
      </div>

      
      <div className="rounded-xl border border-gray-700 p-6 hover-lift card-gradient">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-6 bg-primary rounded-full"></span>
            Postos Cadastrados
          </h2>
          <span className="bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/30">
            {postos.length} posto{postos.length !== 1 ? 's' : ''} cadastrado{postos.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[600px] rounded-xl border border-gray-700 bg-black/20">
            <table className="w-full text-base text-left rounded-xl overflow-hidden">
              <thead className="bg-zinc-800 text-white uppercase text-xs md:text-sm">
                <tr>
                  <th className="px-3 py-2 md:px-6 md:py-4">ID</th>
                  <th className="px-3 py-2 md:px-6 md:py-4">Posto</th>
                  <th className="px-3 py-2 md:px-6 md:py-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {postos.map((posto) => (
                  <tr key={posto.id_posto} className="border-b border-gray-700 hover:bg-zinc-800/50 transition-colors">
                    <td className="px-3 py-2 md:px-6 md:py-4 text-white">{posto.id_posto}</td>
                    <td className="px-3 py-2 md:px-6 md:py-4 text-white">{posto.posto}</td>
                    <td className="px-3 py-2 md:px-6 md:py-4 flex justify-center gap-4">
                      <button
                        onClick={() => handleEdit(posto)}
                        className="text-primary hover:text-primary/80 transition-colors"
                        title="Editar"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => PostoPolicialService.delete(posto.id_posto).then(fetchData)}
                        className="text-error hover:text-error/80 transition-colors"
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
      </div>
    </div>
  );
}