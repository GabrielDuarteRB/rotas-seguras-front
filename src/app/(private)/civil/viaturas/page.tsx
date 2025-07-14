"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import ViaturaService from "@/services/ViaturaService";
import { ViaturaInterface } from "@/interface/Viatura/ViaturaInterface";
import { ButtonPrimary } from "@/components/Button/Primary";

export default function ViaturaListPage() {
  const router = useRouter();
  const [viaturas, setViaturas] = useState<ViaturaInterface[]>([]);

  useEffect(() => {
    ViaturaService.getAll()
      .then((data) => {
        console.log("Viaturas:", data);
        setViaturas(data);
      })
      .catch((err) => {
        console.error("Erro ao buscar viaturas:", err);
        alert("Erro ao buscar viaturas");
      });
  }, []);

  return (
    <div className="container">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Viaturas</h1>
        <p className="text-zinc-300 text-lg">Visualize as viaturas disponíveis</p>
      </div>

      
      <div className="rounded-xl border border-gray-700 p-6 hover-lift card-gradient">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-6 bg-primary rounded-full"></span>
            Viaturas Disponíveis
          </h2>
          <span className="bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/30">
            {viaturas.length} viatura{viaturas.length !== 1 ? 's' : ''} disponível{viaturas.length !== 1 ? 'is' : ''}
          </span>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[600px] md:min-w-[900px] rounded-xl border border-gray-700 bg-black/20">
            <table className="w-full text-base text-left rounded-xl overflow-hidden">
              <thead className="bg-zinc-800 text-white uppercase text-xs md:text-sm">
                <tr>
                  <th className="px-3 py-2 md:px-6 md:py-4">Placa</th>
                  <th className="px-3 py-2 md:px-6 md:py-4">Modelo</th>
                  <th className="px-3 py-2 md:px-6 md:py-4">Ano</th>
                  <th className="px-3 py-2 md:px-6 md:py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(viaturas) && viaturas.map((v) => (
                  <tr key={v.id_viatura} className="border-b border-gray-700 hover:bg-zinc-800/50 transition-colors">
                    <td className="px-3 py-2 md:px-6 md:py-4 text-white">{v.placa}</td>
                    <td className="px-3 py-2 md:px-6 md:py-4 text-white">{v.modelo}</td>
                    <td className="px-3 py-2 md:px-6 md:py-4 text-white">{v.ano}</td>
                    <td className="px-3 py-2 md:px-6 md:py-4 text-white">{v.status_viatura?.descricao || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <ButtonPrimary onClick={() => router.push("/civil/viaturas/create")}>
            <div className="flex items-center gap-2">
              Nova Viatura <FaPlus />
            </div>
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
}