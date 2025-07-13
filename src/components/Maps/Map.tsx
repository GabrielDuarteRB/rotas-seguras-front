'use client'

import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useState, useEffect } from 'react'
import { usePosto } from '@/context/PostoContext'
import { fixLeafletIcons, postoIconSVG } from '@/utils/leaflet-icons'

export default function MapaCriarPosto() {
  const [markerPos, setMarkerPos] = useState<[number, number] | null>(null)
  const [mapReady, setMapReady] = useState(false)
  const { createPosto } = usePosto()

  useEffect(() => {
    // Fix dos ícones quando o componente montar
    fixLeafletIcons();
    setMapReady(true);
  }, []);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng
        setMarkerPos([lat, lng])

        // Criar o posto no contexto
        createPosto({
          latitude: lat,
          longitude: lng,
          id_policial_viatura: 1, // coloque o valor adequado conforme seu caso
          iniciada_em: new Date().toISOString(),
          finalizada_em: new Date().toISOString()
        })
      }
    })

    return markerPos ? <Marker position={markerPos} icon={postoIconSVG} /> : null
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
    <div>
      <MapContainer center={[-23.55, -46.63]} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
      </MapContainer>
    </div>
  )
}
