'use client';

import { useEffect, useState, ChangeEvent } from 'react';
import { ViaturaInterface, StatusViaturaInterface } from '@/interface/Viatura/ViaturaInterface';
import ViaturaService from '@/services/ViaturaService';
import StatusViaturaService from '@/services/StatusViaturaService';

export default function PolicialViaturasPage() {
  const [viaturas, setViaturas] = useState<ViaturaInterface[]>([]);
  const [statusList, setStatusList] = useState<StatusViaturaInterface[]>([]);
  const [filtros, setFiltros] = useState({
    placa: '',
    modelo: '',
    ano: '',
    status: '',
  });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    const [v, s] = await Promise.all([
      ViaturaService.getAll(),
      StatusViaturaService.getAll(),
    ]);
    setViaturas(v);
    setStatusList(s);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const viaturasFiltradas = viaturas.filter((v) =>
    v.placa.toLowerCase().includes(filtros.placa.toLowerCase()) &&
    v.modelo.toLowerCase().includes(filtros.modelo.toLowerCase()) &&
    (filtros.ano === '' || v.ano.toString().includes(filtros.ano)) &&
    (filtros.status === '' || v.status_viatura?.id_status_viatura.toString() === filtros.status)
  );

  return (
    <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Consulta de Viaturas</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          name="placa"
          value={filtros.placa}
          onChange={handleChange}
          placeholder="Buscar por placa"
          className="p-2 border border-gray-500 rounded bg-white/80 text-black backdrop-blur-sm"

        />
        <input
          type="text"
          name="modelo"
          value={filtros.modelo}
          onChange={handleChange}
          placeholder="Buscar por modelo"
          className="p-2 border border-gray-500 rounded bg-white/80 text-black backdrop-blur-sm"

        />
        <input
          type="text"
          name="ano"
          value={filtros.ano}
          onChange={handleChange}
          placeholder="Buscar por ano"
          className="p-2 border border-gray-500 rounded bg-white/80 text-black backdrop-blur-sm"

        />
        <select
          name="status"
          value={filtros.status}
          onChange={handleChange}
          className="p-2 border border-gray-500 rounded bg-white/80 text-black backdrop-blur-sm"

        >
          <option value="">Todos os status</option>
          {statusList.map((s) => (
            <option key={s.id_status_viatura} value={s.id_status_viatura}>
              {s.descricao}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full border-collapse rounded overflow-hidden text-center">
      <thead className="bg-gray-700 text-white">
        <tr>
          <th className="border border-gray-600 p-2">Placa</th>
          <th className="border border-gray-600 p-2">Modelo</th>
          <th className="border border-gray-600 p-2">Ano</th>
          <th className="border border-gray-600 p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {viaturasFiltradas.length === 0 ? (
          <tr>
            <td colSpan={4} className="p-4 text-gray-400 bg-gray-800">
              Nenhuma viatura encontrada.
            </td>
          </tr>
        ) : (
          viaturasFiltradas.map((v) => (
            <tr
              key={v.id_viatura}
              className="bg-gray-800 text-white hover:bg-gray-700 transition"
            >
              <td className="border border-gray-700 p-2">{v.placa}</td>
              <td className="border border-gray-700 p-2">{v.modelo}</td>
              <td className="border border-gray-700 p-2">{v.ano}</td>
              <td className="border border-gray-700 p-2">
                <span
                  className={`px-2 py-1 rounded font-semibold text-sm ${
                    v.status_viatura?.descricao.toLowerCase().includes('disponível')
                      ? 'bg-green-600 text-white'
                      : v.status_viatura?.descricao.toLowerCase().includes('em uso')
                      ? 'bg-yellow-500 text-black'
                      : 'bg-red-600 text-white'
                  }`}
                >
                  {v.status_viatura?.descricao}
                </span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>

    </div>
  );
}
