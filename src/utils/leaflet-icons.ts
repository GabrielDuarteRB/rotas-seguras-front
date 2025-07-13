import L from 'leaflet';

// Função para criar ícones personalizados para o Leaflet
export const createCustomIcon = (iconUrl: string, shadowUrl?: string) => {
  return new L.Icon({
    iconUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

// Função para criar ícones SVG inline (mais robusto)
export const createSVGIcon = (color: string = '#3388ff') => {
  const svg = `
    <svg width="25" height="41" viewBox="0 0 25 41" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.596 0 0 5.596 0 12.5C0 19.404 12.5 41 12.5 41S25 19.404 25 12.5C25 5.596 19.404 0 12.5 0ZM12.5 17C10.567 17 9 15.433 9 13.5C9 11.567 10.567 10 12.5 10C14.433 10 16 11.567 16 13.5C16 15.433 14.433 17 12.5 17Z" fill="${color}"/>
    </svg>
  `;
  
  return new L.DivIcon({
    html: svg,
    className: 'custom-marker',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
  });
};

// Ícones padrão usando CDN
export const defaultIcon = createCustomIcon(
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
);

// Ícone personalizado para postos (azul)
export const postoIcon = createCustomIcon(
  'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
);

// Ícone personalizado para viaturas (verde)
export const viaturaIcon = createCustomIcon(
  'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
);

// Ícone personalizado para ocorrências (vermelho)
export const ocorrenciaIcon = createCustomIcon(
  'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
);

// Ícones SVG inline (mais confiáveis)
export const postoIconSVG = createSVGIcon('#3388ff'); // Azul
export const viaturaIconSVG = createSVGIcon('#51cf66'); // Verde
export const ocorrenciaIconSVG = createSVGIcon('#ff6b6b'); // Vermelho

// Função para fixar os ícones padrão do Leaflet
export const fixLeafletIcons = () => {
  // Remove o método _getIconUrl que causa problemas no Next.js
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  
  // Define os ícones padrão usando CDN
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}; 