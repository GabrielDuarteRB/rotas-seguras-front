'use client';

import { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import ViaturaService from '@/services/ViaturaService';
import StatusViaturaService from '@/services/StatusViaturaService';
import { ViaturaInterface, StatusViaturaInterface } from '@/interface/Viatura/ViaturaInterface';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function AdminViaturasPage() {
  const [viaturas, setViaturas] = useState<ViaturaInterface[]>([]);
  const [statusList, setStatusList] = useState<StatusViaturaInterface[]>([]);
  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState<number | ''>('');
  const [idStatusViatura, setIdStatusViatura] = useState<number>(0);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const viaturasData = await ViaturaService.getAll();
    const statusData = await StatusViaturaService.getAll();
    setViaturas(viaturasData);
    setStatusList(statusData);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editandoId) {
      await ViaturaService.update(editandoId, {
        placa,
        modelo,
        ano: Number(ano),
        id_status_viatura: idStatusViatura,
      });
    } else {
      await ViaturaService.create({
        placa,
        modelo,
        ano: Number(ano),
        id_status_viatura: idStatusViatura,
      });
    }
    resetForm();
    fetchData();
  };

  const resetForm = () => {
    setPlaca('');
    setModelo('');
    setAno('');
    setIdStatusViatura(0);
    setEditandoId(null);
  };

  const handleEdit = (viatura: ViaturaInterface) => {
    setPlaca(viatura.placa);
    setModelo(viatura.modelo);
    setAno(viatura.ano);
    setIdStatusViatura(viatura.id_status_viatura);
    setEditandoId(viatura.id_viatura);
  };

  return (
    <div className="container">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Gerenciamento de Viaturas</h1>
        <p className="text-secondary text-lg">Cadastre e gerencie as viaturas da corporação</p>
      </div>

      
      <div className="rounded-xl border border-gray-700 p-6 mb-8 hover-lift card-gradient">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <span className="w-2 h-6 bg-primary rounded-full"></span>
          {editandoId ? 'Editar Viatura' : 'Cadastrar Nova Viatura'}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-white">Placa</label>
            <input
              type="text"
              value={placa}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPlaca(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-white">Modelo</label>
            <input
              type="text"
              value={modelo}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setModelo(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-white">Ano</label>
            <input
              type="number"
              value={ano}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setAno(Number(e.target.value))}
              className="w-full px-4 py-3 bg-zinc-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-white">Status</label>
            <select
              value={idStatusViatura}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setIdStatusViatura(Number(e.target.value))
              }
              className="w-full px-4 py-3 bg-zinc-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              required
            >
              <option value="">Selecione</option>
              {statusList.map((status) => (
                <option key={status.id_status_viatura} value={status.id_status_viatura}>
                  {status.descricao}
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

      
      <div className="rounded-xl border border-gray-700 p-6 hover-lift card-gradient">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-6 bg-primary rounded-full"></span>
            Viaturas Cadastradas
          </h2>
          <span className="bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/30">
            {viaturas.length} viatura{viaturas.length !== 1 ? 's' : ''} cadastrada{viaturas.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[600px] md:min-w-[900px] rounded-xl border border-gray-700 bg-black/20">
            <table className="w-full text-base text-left rounded-xl overflow-hidden">
              <thead className="bg-zinc-800 text-white uppercase text-xs md:text-sm">
                <tr>
                  <th className="px-3 py-2 md:px-6 md:py-4">ID</th>
                  <th className="px-3 py-2 md:px-6 md:py-4">Placa</th>
                  <th className="px-3 py-2 md:px-6 md:py-4">Modelo</th>
                  <th className="px-3 py-2 md:px-6 md:py-4">Ano</th>
                  <th className="px-3 py-2 md:px-6 md:py-4">Status</th>
                  <th className="px-3 py-2 md:px-6 md:py-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {viaturas.map((viatura) => (
                  <tr key={viatura.id_viatura} className="border-b border-gray-700 hover:bg-zinc-800/50 transition-colors">
                    <td className="px-3 py-2 md:px-6 md:py-4 text-white">{viatura.id_viatura}</td>
                    <td className="px-3 py-2 md:px-6 md:py-4 text-white">{viatura.placa}</td>
                    <td className="px-3 py-2 md:px-6 md:py-4 text-white">{viatura.modelo}</td>
                    <td className="px-3 py-2 md:px-6 md:py-4 text-white">{viatura.ano}</td>
                    <td className="px-3 py-2 md:px-6 md:py-4 text-white">{viatura.status_viatura?.descricao}</td>
                    <td className="px-3 py-2 md:px-6 md:py-4 flex justify-center gap-4">
                      <button
                        onClick={() => handleEdit(viatura)}
                        className="text-primary hover:text-primary/80 transition-colors"
                        title="Editar"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => ViaturaService.delete(viatura.id_viatura).then(fetchData)}
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
