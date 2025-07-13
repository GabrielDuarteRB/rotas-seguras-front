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
  const [loading, setLoading] = useState(false);
  const [matriculaPolicial, setMatriculaPolicial] = useState<number | null>(
    null
  );
  const [idViatura, setIdViatura] = useState<number | null>(null);

  const carregarTudo = async () => {
    setLoading(true);
    try {
      const [pols, vtrs, assocs] = await Promise.all([
        policeApi("/policial", "GET").then((res) => res.json()),
        ViaturaService.getAll(),
        PolicialViaturaService.getAll(),
      ]);
      setPoliciais(pols);
      setViaturas(vtrs);
      setAssociacoes(assocs);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarTudo();
  }, []);

  const associar = async () => {
    if (!matriculaPolicial || !idViatura) {
      alert("Selecione policial e viatura");
      return;
    }

   
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert("Token de autenticação não encontrado. Faça login novamente.");
      return;
    }

    
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
    if (!confirm("Deseja remover esta associação? Esta ação não pode ser desfeita.")) return;
    
    try {
      await PolicialViaturaService.delete(id);
      await carregarTudo();
      alert("Associação removida com sucesso!");
    } catch (error) {
      console.error("Erro ao remover associação:", error);
      alert("Erro ao remover associação. Verifique o console para mais detalhes.");
    }
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
    <div className="container">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Gerenciamento de Associações</h1>
        <p className="text-secondary text-lg">Associe policiais a viaturas para patrulhamento</p>
      </div>

      {/* Card de Criação */}
      <div className="rounded-xl border border-gray-700 p-6 mb-8 hover-lift card-gradient">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <span className="w-2 h-6 bg-primary rounded-full"></span>
          Nova Associação Policial + Viatura
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-white font-medium mb-2 flex items-center gap-2">
              <span>👮‍♂️</span>
              Policial
            </label>
            <select
              className="w-full px-4 py-3 bg-zinc-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              value={matriculaPolicial ?? ""}
              onChange={(e) => setMatriculaPolicial(Number(e.target.value))}
            >
              <option value="">-- Selecione um policial --</option>
              {policiais.map((p) => (
                <option key={p.matricula} value={p.matricula}>
                  Matrícula {p.matricula}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white font-medium mb-2 flex items-center gap-2">
              <span>🚗</span>
              Viatura
            </label>
            <select
              className="w-full px-4 py-3 bg-zinc-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              value={idViatura ?? ""}
              onChange={(e) => setIdViatura(Number(e.target.value))}
            >
              <option value="">-- Selecione uma viatura --</option>
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
              disabled={!matriculaPolicial || !idViatura}
              className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                matriculaPolicial && idViatura
                  ? "bg-primary text-white hover:bg-primary/90 transform hover:scale-105 pulse-glow"
                  : "bg-zinc-700 text-zinc-400 cursor-not-allowed"
              }`}
            >
              {matriculaPolicial && idViatura ? (
                <span className="flex items-center justify-center gap-2">
                  <span>🔗</span>
                  Associar
                </span>
              ) : (
                "Selecione policial e viatura"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Lista de Associações Existentes */}
      <div className="rounded-xl border border-gray-700 p-6 hover-lift card-gradient">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-6 bg-primary rounded-full"></span>
            Associações Existentes
          </h2>
          <span className="bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/30">
            {associacoes.length} associaç{associacoes.length !== 1 ? 'ões' : 'ão'} ativa{associacoes.length !== 1 ? 's' : ''}
          </span>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4 pulse-glow"></div>
            <p className="text-zinc-400">Carregando associações...</p>
          </div>
        ) : associacoes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚔</div>
            <p className="text-zinc-400 text-lg">Nenhuma associação cadastrada ainda.</p>
            <p className="text-zinc-500 text-sm mt-2">Crie a primeira associação usando o formulário acima!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-[600px] md:min-w-[900px] rounded-xl border border-gray-700 bg-black/20">
              <table className="w-full text-base text-left rounded-xl overflow-hidden">
                <thead className="bg-zinc-800 text-white uppercase text-xs md:text-sm">
                  <tr>
                    <th className="px-3 py-2 md:px-6 md:py-4">ID</th>
                    <th className="px-3 py-2 md:px-6 md:py-4">Policial</th>
                    <th className="px-3 py-2 md:px-6 md:py-4">Viatura</th>
                    <th className="px-3 py-2 md:px-6 md:py-4">Ativado em</th>
                    <th className="px-3 py-2 md:px-6 md:py-4">Devolvido em</th>
                    <th className="px-3 py-2 md:px-6 md:py-4 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {associacoes.map((associacao) => (
                    <tr
                      key={associacao.id_policial_viatura}
                      className="border-t border-gray-700 hover:bg-zinc-700 transition-colors"
                    >
                      <td className="px-3 py-2 md:px-6 md:py-3 text-white font-mono">
                        #{associacao.id_policial_viatura}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-3 text-white">
                        <span className="text-primary font-medium">
                          {getNomePolicial(associacao.matricula_policial)}
                        </span>
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-3 text-white">
                        <span className="text-primary font-medium">
                          {getInfoViatura(associacao.id_viatura)}
                        </span>
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-3 text-white">
                        {new Date(associacao.ativado_em).toLocaleString('pt-BR')}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-3 text-white">
                        {associacao.devolvido_em 
                          ? (
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-error rounded-full"></span>
                              <span className="text-error">{new Date(associacao.devolvido_em).toLocaleString('pt-BR')}</span>
                            </div>
                          )
                          : (
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-success rounded-full"></span>
                              <span className="text-success font-medium">Ativa</span>
                            </div>
                          )
                        }
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-3 text-center">
                        <button
                          onClick={() => remover(associacao.id_policial_viatura)}
                          className="text-error hover:text-error/80 transition-colors font-medium px-3 py-1 rounded-lg hover:bg-error/10"
                        >
                          🗑️ Remover
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
