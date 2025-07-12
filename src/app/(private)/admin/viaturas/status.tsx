"use client";

import { useEffect, useState } from "react";
import { policeApi } from "@/utils/police-api";
import { InputText } from "@/components/Input/Text";
import { ButtonPrimary } from "@/components/Button/Primary";

export default function StatusViaturaAdminPage() {
  const [statusList, setStatusList] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const fetchStatus = async () => {
    const res = await policeApi("/status-viatura");
    const data = await res.json();
    setStatusList(data);
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!descricao.trim()) return;

    if (editandoId !== null) {
      await policeApi(`/status-viatura/${editandoId}`, "PATCH", { descricao });
    } else {
      await policeApi("/status-viatura", "POST", { descricao });
    }

    setDescricao("");
    setEditandoId(null);
    fetchStatus();
  };

  const handleEdit = (id: number, descricao: string) => {
    setEditandoId(id);
    setDescricao(descricao);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Deseja realmente remover este status?")) {
      await policeApi(`/status-viatura/${id}`, "DELETE");
      fetchStatus();
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-primary mb-6">
        Gerenciar Status de Viatura
      </h1>

      <form onSubmit={handleSubmit} className="flex gap-4 mb-6 bg-white p-4 rounded-lg shadow">
        <InputText
          label="Descrição do Status"
          name="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <div className="flex items-end">
          <ButtonPrimary type="submit">{editandoId !== null ? "Atualizar" : "Cadastrar"}</ButtonPrimary>
        </div>
      </form>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Descrição</th>
              <th className="px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {statusList.map((s: any) => (
              <tr key={s.id_status_viatura} className="border-t">
                <td className="px-4 py-2">{s.id_status_viatura}</td>
                <td className="px-4 py-2">{s.descricao}</td>
                <td className="px-4 py-2 space-x-2">
                  <button onClick={() => handleEdit(s.id_status_viatura, s.descricao)} className="text-blue-600 hover:underline">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(s.id_status_viatura)} className="text-red-600 hover:underline">
                    Remover
                  </button>
                </td>
              </tr>
            ))}
            {statusList.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center p-4 text-gray-500">Nenhum status cadastrado</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
