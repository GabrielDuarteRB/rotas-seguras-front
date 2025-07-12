'use client'


import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useState } from 'react'
import { usePosto } from '@/context/PostoContext'

export default function MapaCriarPosto() {
  const [markerPos, setMarkerPos] = useState<[number, number] | null>(null)
  const { createPosto } = usePosto()

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng
        setMarkerPos([lat, lng])

        // Criar o posto no contexto
        createPosto({
          latitude: lat,
          longitude: lng,
          id_policial_viatura: 1 // coloque o valor adequado conforme seu caso
        })
      }
    })

    return markerPos ? <Marker position={markerPos} /> : null
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
