'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import { 
  fixLeafletIcons, 
  postoIconSVG, 
  viaturaIconSVG, 
  ocorrenciaIconSVG,
  defaultIcon 
} from '@/utils/leaflet-icons'

export default function MapExample() {
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    fixLeafletIcons()
    setMapReady(true)
  }, [])

  if (!mapReady) {
    return (
      <div 
        style={{ height: "400px", width: "100%" }} 
        className="flex items-center justify-center bg-gray-100 border rounded"
      >
        <p className="text-gray-500">Carregando mapa...</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Exemplo de diferentes tipos de marcadores</h2>
      <MapContainer 
        center={[-23.55, -46.63]} 
        zoom={13} 
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {/* Posto (azul) */}
        <Marker position={[-23.55, -46.63]} icon={postoIconSVG}>
          <Popup>
            <strong>Posto de Polícia</strong><br />
            Localização: Centro da cidade
          </Popup>
        </Marker>
        
        {/* Viatura (verde) */}
        <Marker position={[-23.56, -46.64]} icon={viaturaIconSVG}>
          <Popup>
            <strong>Viatura em Patrulha</strong><br />
            Modelo: Chevrolet Onix
          </Popup>
        </Marker>
        
        {/* Ocorrência (vermelho) */}
        <Marker position={[-23.54, -46.62]} icon={ocorrenciaIconSVG}>
          <Popup>
            <strong>Ocorrência Reportada</strong><br />
            Tipo: Roubo
          </Popup>
        </Marker>
        
        {/* Marcador padrão */}
        <Marker position={[-23.57, -46.65]} icon={defaultIcon}>
          <Popup>
            <strong>Marcador Padrão</strong><br />
            Usando ícone padrão do Leaflet
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
} 