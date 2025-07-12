// src/app/(private)/admin/viaturas/page.tsx
"use client";

import { useEffect, useState } from "react";
import { ViaturaInterface } from "@/interface/Viatura/ViaturaInterface";
import { policeApi } from "@/utils/police-api";

export default function AdminViaturaPage() {
  const [viaturas, setViaturas] = useState<ViaturaInterface[]>([]);

  useEffect(() => {
    policeApi("/viatura")
      .then(async (res) => {
        const data = await res.json();
        setViaturas(data);
      })
      .catch((err) => {
        console.error("Erro ao buscar viaturas:", err);
        alert("Erro ao buscar viaturas");
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Todas as Viaturas</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="py-3 px-4">Placa</th>
              <th className="py-3 px-4">Modelo</th>
              <th className="py-3 px-4">Ano</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {viaturas.map((v) => (
              <tr key={v.id_viatura} className="text-center border-b">
                <td className="py-2 px-4">{v.placa}</td>
                <td className="py-2 px-4">{v.modelo}</td>
                <td className="py-2 px-4">{v.ano}</td>
                <td className="py-2 px-4">{v.status_viatura?.descricao || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
