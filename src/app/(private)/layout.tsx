import MenuSideBar from '@/components/Menu/SideBar'
import { AuthProvider } from '@/context/AuthContext';
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
          <MenuSideBar />
          <span className="image-background"></span>
          <div className="container">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}