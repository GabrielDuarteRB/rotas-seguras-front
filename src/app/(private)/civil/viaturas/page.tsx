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
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-primary mb-8">Viaturas</h1>

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
            {Array.isArray(viaturas) && viaturas.map((v) => (
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

      <div className="flex justify-center mt-8">
        <ButtonPrimary onClick={() => router.push("/civil/viaturas/create")}>
          <div className="flex items-center gap-2">
            Nova Viatura <FaPlus />
          </div>
        </ButtonPrimary>
      </div>
    </div>
  );
}