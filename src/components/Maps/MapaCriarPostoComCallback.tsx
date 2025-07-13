"use client";

import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { fixLeafletIcons, postoIconSVG } from "@/utils/leaflet-icons";

interface Posto {
  id: number;
  latitude: number;
  longitude: number;
  id_policial_viatura: number;
}

export default function MapaCriarPostoComCallback({
  onSelectPosition,
  postos = [],
}: {
  onSelectPosition: (pos: { lat: number; lng: number }) => void;
  postos?: Posto[];
}) {
  const [markerPos, setMarkerPos] = useState<[number, number] | null>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    // Fix dos ícones quando o componente montar
    fixLeafletIcons();
    setMapReady(true);
  }, []);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarkerPos([lat, lng]);
        onSelectPosition({ lat, lng });
      },
    });

    return markerPos ? (
      <Marker position={markerPos} icon={postoIconSVG} />
    ) : null;
  }

  if (!mapReady) {
    return (
      <div
        style={{ height: "400px", width: "100%" }}
        className="flex items-center justify-center bg-gray-100 border rounded"
      >
        <p className="text-gray-500">Carregando mapa...</p>
      </div>
    );
  }

  return (
    <MapContainer
      center={[-22.88, -43.25]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker />
      
      {/* Marcadores dos postos existentes */}
      {postos.map((posto) => (
        <Marker
          key={posto.id}
          position={[posto.latitude, posto.longitude]}
          icon={postoIconSVG}
        >
          <Popup>
            <div className="p-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🏢</span>
                <strong className="text-lg text-primary">Posto #{posto.id}</strong>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-gray-600">👮‍♂️</span>
                  <span>Policial-Viatura: <strong>{posto.id_policial_viatura}</strong></span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-600">📍</span>
                  <span>Lat: {posto.latitude.toFixed(6)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-600">📍</span>
                  <span>Lng: {posto.longitude.toFixed(6)}</span>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
