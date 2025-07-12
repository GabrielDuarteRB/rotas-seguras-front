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
            <div className="image-wrapper">
              <span className="image-background"></span>
              <div className="container">
                {children}
              </div>
            </div>
          </OcorrenciaProvider>
        </AuthProvider>
      </body>
    </html>
  )
}