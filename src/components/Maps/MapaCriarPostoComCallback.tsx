'use client'

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { useState } from 'react'
import 'leaflet/dist/leaflet.css'

export default function MapaCriarPostoComCallback({
  onSelectPosition,
}: {
  onSelectPosition: (pos: { lat: number; lng: number }) => void
}) {
  const [markerPos, setMarkerPos] = useState<[number, number] | null>(null)

  function LocationMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng
        setMarkerPos([lat, lng])
        onSelectPosition({ lat, lng })
      },
    })

    return markerPos ? <Marker position={markerPos} /> : null
  }

  return (
    <MapContainer
      center={[-23.55, -46.63]}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker />
    </MapContainer>
  )
}
