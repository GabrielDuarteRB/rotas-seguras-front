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
    <div className="bg-gray-900 text-white p-8 rounded-xl shadow-xl max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Gerenciar Policiais</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 items-end"
      >
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-white">ID Pessoa</label>
          <input
            type="number"
            value={idPessoa}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setIdPessoa(Number(e.target.value))}
            className="p-2 border border-gray-600 rounded bg-white/90 text-black"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-white">Posto</label>
          <input
            type="number"
            value={posto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPosto(Number(e.target.value))}
            className="p-2 border border-gray-600 rounded bg-white/90 text-black"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-white">Status</label>
          <select
            value={ativo}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setAtivo(e.target.value)}
            className="p-2 border border-gray-600 rounded bg-white/90 text-black"
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
          className="bg-teal-600 text-white p-2 rounded hover:bg-teal-700 transition"
        >
          {editandoId ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>

      {/* FILTROS */}
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

      {/* TABELA */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm text-center rounded overflow-hidden">
          <thead className="bg-gray-800 text-white uppercase">
            <tr>
              <th className="px-4 py-2 border border-gray-700">ID</th>
              <th className="px-4 py-2 border border-gray-700">ID Pessoa</th>
              <th className="px-4 py-2 border border-gray-700">Posto</th>
              <th className="px-4 py-2 border border-gray-700">Status</th>
              <th className="px-4 py-2 border border-gray-700">Ações</th>
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
                <td className="px-4 py-2 border border-gray-800 flex justify-center gap-4">
                  <button
                    onClick={() => handleEdit(policial)}
                    className="text-blue-400 hover:text-blue-600"
                    title="Editar"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => PolicialService.delete(policial.id_policial).then(fetchData)}
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
