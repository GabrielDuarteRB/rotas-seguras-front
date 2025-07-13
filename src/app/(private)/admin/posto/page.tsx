"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePosto } from "@/context/PostoContext";
import PolicialViaturaService from "@/services/PolicialViaturaService";
import PostoService from "@/services/PostoService";
import type { PolicialViaturaInterface } from "@/interface/PolicialViatura/PolicialViaturaInterface";
import type { PostoInterface } from "@/interface/Posto/PostoInterface";
import { policeApi } from "@/utils/police-api";

interface Policial {
  matricula: number;
}

interface Viatura {
  id_viatura: number;
  modelo: string;
  placa: string;
}

const Mapa = dynamic(
  () => import("@/components/Maps/MapaCriarPostoComCallback"),
  {
    ssr: false,
  }
);

export default function MapaPostoPage() {
  const { createPosto, getPostos } = usePosto();
  const [policiais, setPoliciais] = useState<Policial[]>([]);
  const [viaturas, setViaturas] = useState<Viatura[]>([]);
  const [postos, setPostos] = useState<PostoInterface[]>([]);
  const [loading, setLoading] = useState(false);

  const [idPolicialViatura, setIdPolicialViatura] = useState<number | null>(
    null
  );
  const [listaPolicialViatura, setListaPolicialViatura] = useState<
    PolicialViaturaInterface[]
  >([]);
  const [posicao, setPosicao] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [policiaisData, viaturasData, pvData, postosData] = await Promise.all([
          policeApi("/policial", "GET").then((res) => res.json()),
          policeApi("/viatura", "GET").then((res) => res.json()),
          PolicialViaturaService.getAll(),
          PostoService.getAll(),
        ]);
        setPoliciais(policiaisData);
        setViaturas(viaturasData);
        setListaPolicialViatura(pvData);
        setPostos(postosData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getPostos]);

  const handleConcluir = async () => {
    if (!idPolicialViatura || !posicao) {
      alert("Selecione policial + viatura e marque o ponto no mapa.");
      return;
    }

    try {
      await createPosto({
        id_policial_viatura: idPolicialViatura,
        latitude: posicao.lat,
        longitude: posicao.lng,
        iniciada_em: new Date().toISOString(),
        finalizada_em: new Date().toISOString(),
      });

      alert("Posto criado com sucesso!");
      
      // Recarregar a lista de postos
      const novosPostos = await PostoService.getAll();
      setPostos(novosPostos);
      
      // Limpar os campos após sucesso
      setIdPolicialViatura(null);
      setPosicao(null);
    } catch (error) {
      console.error("Erro ao criar posto:", error);
      alert("Erro ao criar posto. Verifique o console para mais detalhes.");
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

  const getInfoPolicialViatura = (idPolicialViatura: number) => {
    const pv = listaPolicialViatura.find((pv) => pv.id_policial_viatura === idPolicialViatura);
    if (!pv) return `Policial-Viatura ${idPolicialViatura}`;
    
    const policial = getNomePolicial(pv.matricula_policial);
    const viatura = getInfoViatura(pv.id_viatura);
    return `${policial} com ${viatura}`;
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleString('pt-BR');
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Gerenciamento de Postos</h1>
        <p className="text-secondary text-lg">Cadastre e visualize postos de policiamento no mapa</p>
      </div>

      {/* Card de Criação */}
      <div className="rounded-xl border border-gray-700 p-6 mb-8 hover-lift card-gradient">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <span className="w-2 h-6 bg-primary rounded-full"></span>
          Cadastrar Novo Posto
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Formulário */}
          <div className="space-y-4">
            <div>
              <label className="block text-white font-medium mb-2">Policial + Viatura:</label>
              <select
                className="w-full px-4 py-3 bg-zinc-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                value={idPolicialViatura ?? ""}
                onChange={(e) => setIdPolicialViatura(Number(e.target.value))}
              >
                <option value="">-- Selecione uma associação --</option>
                {listaPolicialViatura.map((pv) => (
                  <option key={pv.id_policial_viatura} value={pv.id_policial_viatura}>
                    {getNomePolicial(pv.matricula_policial)} com {getInfoViatura(pv.id_viatura)}
                  </option>
                ))}
              </select>
            </div>

            {posicao && (
              <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                <p className="text-primary font-medium mb-2">📍 Local selecionado:</p>
                <div className="space-y-1 text-sm">
                  <p className="text-white">
                    <span className="text-primary">Latitude:</span> {posicao.lat.toFixed(6)}
                  </p>
                  <p className="text-white">
                    <span className="text-primary">Longitude:</span> {posicao.lng.toFixed(6)}
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={handleConcluir}
              disabled={!idPolicialViatura || !posicao}
              className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                idPolicialViatura && posicao
                  ? "bg-primary text-white hover:bg-primary/90 transform hover:scale-105 pulse-glow"
                  : "bg-zinc-700 text-zinc-400 cursor-not-allowed"
              }`}
            >
              {idPolicialViatura && posicao ? (
                <span className="flex items-center justify-center gap-2">
                  <span>🎯</span>
                  Criar Posto
                </span>
              ) : (
                "Selecione policial + viatura e marque o ponto no mapa"
              )}
            </button>
          </div>

          {/* Mapa */}
          <div>
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              <span>🗺️</span>
              Clique no mapa para marcar o posto
            </h3>
            <div className="border border-gray-600 rounded-lg overflow-hidden shadow-lg">
              <Mapa onSelectPosition={(pos) => setPosicao(pos)} postos={postos} />
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Postos Existentes */}
      <div className="rounded-xl border border-gray-700 p-6 hover-lift card-gradient">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-6 bg-primary rounded-full"></span>
            Postos Existentes
          </h2>
          <span className="bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/30">
            {postos.length} posto{postos.length !== 1 ? 's' : ''} cadastrado{postos.length !== 1 ? 's' : ''}
          </span>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4 pulse-glow"></div>
            <p className="text-zinc-400">Carregando postos...</p>
          </div>
        ) : postos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏢</div>
            <p className="text-zinc-400 text-lg">Nenhum posto cadastrado ainda.</p>
            <p className="text-zinc-500 text-sm mt-2">Crie o primeiro posto usando o formulário acima!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-[600px] md:min-w-[900px] rounded-xl border border-gray-700 bg-black/20">
              <table className="w-full text-base text-left rounded-xl overflow-hidden">
                <thead className="bg-zinc-800 text-white uppercase text-xs md:text-sm">
                  <tr>
                    <th className="px-3 py-2 md:px-6 md:py-4">ID</th>
                    <th className="px-3 py-2 md:px-6 md:py-4">Policial + Viatura</th>
                    <th className="px-3 py-2 md:px-6 md:py-4">Coordenadas</th>
                    <th className="px-3 py-2 md:px-6 md:py-4">Iniciada em</th>
                    <th className="px-3 py-2 md:px-6 md:py-4">Finalizada em</th>
                  </tr>
                </thead>
                <tbody>
                  {postos.map((posto, index) => (
                    <tr
                      key={posto.id}
                      className="border-t border-gray-700 hover:bg-zinc-700 transition-colors"
                    >
                      <td className="px-3 py-2 md:px-6 md:py-3 text-white font-mono">
                        #{posto.id}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-3 text-white">
                        <span className="text-primary font-medium">
                          {getInfoPolicialViatura(posto.id_policial_viatura)}
                        </span>
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-3 text-white">
                        <div className="text-sm">
                          <div>Lat: {posto.latitude.toFixed(6)}</div>
                          <div>Lng: {posto.longitude.toFixed(6)}</div>
                        </div>
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-3 text-white">
                        {formatarData(posto.iniciada_em)}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-3 text-white">
                        {formatarData(posto.finalizada_em)}
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
