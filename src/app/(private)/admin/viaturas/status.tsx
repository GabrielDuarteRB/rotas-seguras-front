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
    <div className="container">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Gerenciamento de Status de Viatura</h1>
        <p className="text-zinc-300 text-lg">Configure os status disponíveis para as viaturas</p>
      </div>

      
      <div className="rounded-xl border border-gray-700 p-6 mb-8 hover-lift card-gradient">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <span className="w-2 h-6 bg-primary rounded-full"></span>
          {editandoId !== null ? 'Editar Status' : 'Cadastrar Novo Status'}
        </h2>

        <form onSubmit={handleSubmit} className="flex gap-4 items-end">
          <div className="flex-1">
            <InputText
              label="Descrição do Status"
              name="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </div>
          <div className="flex items-end">
            <ButtonPrimary type="submit">
              {editandoId !== null ? "Atualizar" : "Cadastrar"}
            </ButtonPrimary>
          </div>
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
                {statusList.map((s: any) => (
                  <tr key={s.id_status_viatura} className="border-b border-gray-700 hover:bg-zinc-800/50 transition-colors">
                    <td className="px-3 py-2 md:px-6 md:py-4 text-white">{s.id_status_viatura}</td>
                    <td className="px-3 py-2 md:px-6 md:py-4 text-white">{s.descricao}</td>
                    <td className="px-3 py-2 md:px-6 md:py-4 flex justify-center gap-4">
                      <button 
                        onClick={() => handleEdit(s.id_status_viatura, s.descricao)} 
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => handleDelete(s.id_status_viatura)} 
                        className="text-error hover:text-error/80 transition-colors"
                      >
                        Remover
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
