'use client';

import { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import PolicialService from '@/services/PolicialService';
import { PolicialInterface } from '@/interface/Policial/PolicialInterface';
import statusPolicial from '@/constants/statusPolicial';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function AdminPoliciaisPage() {
  const [policiais, setPoliciais] = useState<PolicialInterface[]>([]);
  const [idPessoa, setIdPessoa] = useState<number | ''>('');
  const [posto, setPosto] = useState<number | ''>('');
  const [ativo, setAtivo] = useState<string>('1');
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const [filtroPosto, setFiltroPosto] = useState<number | ''>('');
  const [filtroAtivo, setFiltroAtivo] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await PolicialService.getAll();
    setPoliciais(data);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const policialData = {
      id_pessoa: Number(idPessoa),
      posto: Number(posto),
      ativo: ativo === '1',
    };

    if (editandoId) {
      await PolicialService.update(editandoId, policialData);
    } else {
      await PolicialService.create(policialData);
    }
    resetForm();
    fetchData();
  };

  const resetForm = () => {
    setIdPessoa('');
    setPosto('');
    setAtivo('1');
    setEditandoId(null);
  };

  const handleEdit = (policial: PolicialInterface) => {
    setIdPessoa(policial.id_pessoa);
    setPosto(policial.posto);
    setAtivo(policial.ativo ? '1' : '0');
    setEditandoId(policial.id_policial);
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
        const data = await PolicialService.getPoliciaisAtivos();
        if (filtroAtivo === '1') {
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
    <div className="container">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Gerenciamento de Policiais</h1>
        <p className="text-secondary text-lg">Cadastre e gerencie os policiais da corporação</p>
      </div>

      
      <div className="rounded-xl border border-gray-700 p-6 mb-8 hover-lift card-gradient">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <span className="w-2 h-6 bg-primary rounded-full"></span>
          {editandoId ? 'Editar Policial' : 'Cadastrar Novo Policial'}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-white">ID Pessoa</label>
            <input
              type="number"
              value={idPessoa}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setIdPessoa(Number(e.target.value))}
              className="w-full px-4 py-3 bg-zinc-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-white">Posto</label>
            <input
              type="number"
              value={posto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPosto(Number(e.target.value))}
              className="w-full px-4 py-3 bg-zinc-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-white">Status</label>
            <select
              value={ativo}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setAtivo(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              required
            >
              {statusPolicial.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
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
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-white">Filtrar por Posto</label>
            <input
              type="number"
              value={filtroPosto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFiltroPosto(Number(e.target.value))}
              className="w-full px-4 py-3 bg-zinc-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-white">Filtrar por Status</label>
            <select
              value={filtroAtivo}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setFiltroAtivo(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            >
              <option value="">Todos</option>
              {statusPolicial.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
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
            Policiais Cadastrados
          </h2>
          <span className="bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/30">
            {policiais.length} policial{policiais.length !== 1 ? 'is' : ''} cadastrado{policiais.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[600px] md:min-w-[900px] rounded-xl border border-gray-700 bg-black/20">
            <table className="w-full text-base text-left rounded-xl overflow-hidden">
              <thead className="bg-zinc-800 text-white uppercase text-xs md:text-sm">
                <tr>
                  <th className="px-3 py-2 md:px-6 md:py-4">ID</th>
                  <th className="px-3 py-2 md:px-6 md:py-4">ID Pessoa</th>
                  <th className="px-3 py-2 md:px-6 md:py-4">Posto</th>
                  <th className="px-3 py-2 md:px-6 md:py-4">Status</th>
                  <th className="px-3 py-2 md:px-6 md:py-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {policiais.map((policial) => (
                  <tr key={policial.id_policial} className="border-b border-gray-700 hover:bg-zinc-800/50 transition-colors">
                    <td className="px-3 py-2 md:px-6 md:py-4 text-white">{policial.id_policial}</td>
                    <td className="px-3 py-2 md:px-6 md:py-4 text-white">{policial.id_pessoa}</td>
                    <td className="px-3 py-2 md:px-6 md:py-4 text-white">{policial.posto}</td>
                    <td className="px-3 py-2 md:px-6 md:py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        policial.ativo 
                          ? 'bg-success/20 text-success border border-success/30' 
                          : 'bg-error/20 text-error border border-error/30'
                      }`}>
                        {policial.ativo ? 'Ativo' : 'Não Ativo'}
                      </span>
                    </td>
                    <td className="px-3 py-2 md:px-6 md:py-4 flex justify-center gap-4">
                      <button
                        onClick={() => handleEdit(policial)}
                        className="text-primary hover:text-primary/80 transition-colors"
                        title="Editar"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => PolicialService.delete(policial.id_policial).then(fetchData)}
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
