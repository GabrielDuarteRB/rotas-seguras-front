'use client';

import { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import ViaturaService from '@/services/ViaturaService';
import StatusViaturaService from '@/services/StatusViaturaService';
import { ViaturaInterface } from '@/interface/Viatura/ViaturaInterface';
import { StatusViaturaInterface } from '@/interface/Viatura/ViaturaInterface';
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
        id_status_viatura: idStatusViatura
      });
    } else {
      await ViaturaService.create({
        placa,
        modelo,
        ano: Number(ano),
        id_status_viatura: idStatusViatura
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
    <div className="p-6 bg-white rounded-xl shadow-md max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">Gerenciar Viaturas</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8 items-end"
      >
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">Placa</label>
          <input
            type="text"
            value={placa}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPlaca(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">Modelo</label>
          <input
            type="text"
            value={modelo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setModelo(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">Ano</label>
          <input
            type="number"
            value={ano}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setAno(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">Status</label>
          <select
            value={idStatusViatura}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setIdStatusViatura(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded"
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
          className="bg-primary text-white p-2 rounded hover:bg-opacity-80"
        >
          {editandoId ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Placa</th>
              <th className="px-4 py-2">Modelo</th>
              <th className="px-4 py-2">Ano</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {viaturas.map((viatura) => (
              <tr key={viatura.id_viatura} className="border-t">
                <td className="px-4 py-2">{viatura.id_viatura}</td>
                <td className="px-4 py-2">{viatura.placa}</td>
                <td className="px-4 py-2">{viatura.modelo}</td>
                <td className="px-4 py-2">{viatura.ano}</td>
                <td className="px-4 py-2">{viatura.status_viatura?.descricao}</td>
                <td className="px-4 py-2 flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(viatura)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Editar"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => ViaturaService.delete(viatura.id_viatura).then(fetchData)}
                    className="text-red-600 hover:text-red-800"
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
