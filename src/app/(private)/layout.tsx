import MenuSideBar from '@/components/Menu/SideBar'
import { AuthProvider } from '@/context/AuthContext';
import { OcorrenciaProvider } from '@/context/OcorrenciaContext';
import '../globals.css'

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className="flex">
        <AuthProvider>
          <OcorrenciaProvider>
            <MenuSideBar />
            <span className="image-background"></span>
            <div className="container">
              {children}
            </div>
          </OcorrenciaProvider>
        </AuthProvider>
      </body>
    </html>
  )
}