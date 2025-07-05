import '../globals.css'
import { AuthProvider } from '@/context/AuthContext';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body style={{ background: "var(--color-secondary)" }}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}