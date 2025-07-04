import MenuSideBar from '@/components/Menu/SideBar'

import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={'flex'}>
        <MenuSideBar />
        <span className={'image-background'}></span>
        <div className={'container'}>
          {children}
        </div>
      </body>
    </html>
  )
}