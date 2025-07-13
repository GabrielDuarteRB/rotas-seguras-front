"use client";

import { useEffect, useState } from "react";
import PolicialViaturaService from "@/services/PolicialViaturaService";
import ViaturaService from "@/services/ViaturaService";
import { policeApi } from "@/utils/police-api";

interface Policial {
  matricula: number;
}

interface Viatura {
  id_viatura: number;
  modelo: string;
  placa: string;
}

interface PolicialViatura {
  id_policial_viatura: number;
  matricula_policial: number;
  id_viatura: number;
  ativado_em: string;
  devolvido_em: string;
}

export default function PolicialViaturaPage() {
  const [associacoes, setAssociacoes] = useState<PolicialViatura[]>([]);
  const [policiais, setPoliciais] = useState<Policial[]>([]);
  const [viaturas, setViaturas] = useState<Viatura[]>([]);
  const [matriculaPolicial, setMatriculaPolicial] = useState<number | null>(
    null
  );
  const [idViatura, setIdViatura] = useState<number | null>(null);

  const carregarTudo = async () => {
    const [pols, vtrs, assocs] = await Promise.all([
      policeApi("/policial", "GET").then((res) => res.json()),
      ViaturaService.getAll(),
      PolicialViaturaService.getAll(),
    ]);
    setPoliciais(pols);
    setViaturas(vtrs);
    setAssociacoes(assocs);
  };

  useEffect(() => {
    carregarTudo();
  }, []);

  const associar = async () => {
    if (!matriculaPolicial || !idViatura) {
      alert("Selecione policial e viatura");
      return;
    }

    // Verificar token de autenticação
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert("Token de autenticação não encontrado. Faça login novamente.");
      return;
    }

    // Verificar se já existe uma associação ativa
    const associacaoExistente = associacoes.find(
      (a) => a.matricula_policial === matriculaPolicial && !a.devolvido_em
    );
    
    if (associacaoExistente) {
      alert("Este policial já possui uma viatura associada ativamente");
      return;
    }

    const viaturaEmUso = associacoes.find(
      (a) => a.id_viatura === idViatura && !a.devolvido_em
    );
    
    if (viaturaEmUso) {
      alert("Esta viatura já está em uso por outro policial");
      return;
    }

    try {
      const response = await PolicialViaturaService.create({
        matricula_policial: matriculaPolicial,
        id_viatura: idViatura,
        ativado_em: new Date().toISOString(),
        devolvido_em: null
      });
      
      await carregarTudo();
      setMatriculaPolicial(null);
      setIdViatura(null);
      alert("Associação criada com sucesso!");
    } catch (err) {
      console.error("Erro ao associar:", err);
      alert(`Erro ao associar: ${err}`);
    }
  };

  const remover = async (id: number) => {
    if (!confirm("Deseja remover esta associação?")) return;
    await PolicialViaturaService.delete(id);
    await carregarTudo();
  };



  const getNomePolicial = (matricula: number) => {
    const p = policiais.find((p) => p.matricula === matricula);
    return p ? `${p.matricula}` : `Matrícula ${matricula}`;
  };

  const getInfoViatura = (id: number) => {
    const v = viaturas.find((v) => v.id_viatura === id);
    return v ? `${v.modelo} - ${v.placa}` : `Viatura ${id}`;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Associação Policial + Viatura</h1>



      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block mb-1">Policial</label>
          <select
            className="border p-2 w-full"
            value={matriculaPolicial ?? ""}
            onChange={(e) => setMatriculaPolicial(Number(e.target.value))}
          >
            <option value="">-- Selecione --</option>
            {policiais.map((p) => (
              <option key={p.matricula} value={p.matricula}>
                {p.matricula}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Viatura</label>
          <select
            className="border p-2 w-full"
            value={idViatura ?? ""}
            onChange={(e) => setIdViatura(Number(e.target.value))}
          >
            <option value="">-- Selecione --</option>
            {viaturas.map((v) => (
              <option key={v.id_viatura} value={v.id_viatura}>
                {v.modelo} - {v.placa}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={associar}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
          >
            Associar
          </button>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-3">Associações existentes</h2>

      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">Policial</th>
            <th className="border px-4 py-2 text-left">Viatura</th>
            <th className="border px-4 py-2 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {associacoes.map((a) => (
            <tr key={a.id_policial_viatura}>
              <td className="border px-4 py-2">
                {getNomePolicial(a.matricula_policial)}
              </td>
              <td className="border px-4 py-2">
                {getInfoViatura(a.id_viatura)}
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => remover(a.id_policial_viatura)}
                  className="text-red-600 hover:underline"
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
