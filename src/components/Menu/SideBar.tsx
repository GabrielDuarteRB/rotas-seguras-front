"use client";

import { useState, useContext } from "react";
import { FaExclamationTriangle , FaHome, FaShareAlt, FaBars, FaTimes, FaSignOutAlt, FaCarSide } from "react-icons/fa";
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from "next/image";
import logo from "@/assets/img/logo.png";
import { AuthContext } from '@/context/AuthContext';

const navOptions = {
  civil:[
    { id: 1, label: "Home", href: '/civil', icon: <FaHome  /> },
    { id: 2, label: "Ocorrencias", href: '/civil/ocorrencia', icon: <FaExclamationTriangle  /> },
    { id: 3, label: "Posto de guarda", href: '/civil/posto', icon: <FaShareAlt  /> },
  ],
  admin: [
    { id: 1, label: "Home", href: '/admin', icon: <FaHome  /> },
    { id: 2, label: "Ocorrencias", href: '/admin/ocorrencia', icon: <FaExclamationTriangle  /> },
    { id: 3, label: "Viaturas", href: '/admin/viaturas', icon: <FaCarSide /> },
    { id: 4, label: "Status Viatura", href: '/admin/status', icon: <FaCarSide /> },
    { id: 5, label: "Posto de guarda", href: '/admin/posto', icon: <FaShareAlt  /> },
    { id: 6, label: "Policial Viatura", href: '/admin/policial-viatura', icon: <FaHome /> }
  ],
  policial: [
    { id: 1, label: "Home", href: '/policial', icon: <FaHome  /> },
    { id: 2, label: "Ocorrencias", href: '/policial/ocorrencia', icon: <FaExclamationTriangle  /> },
    { id: 3, label: "Viaturas", href: '/policial/viaturas', icon: <FaCarSide /> },
  ]
};

export default function MenuSideBar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname()
  const type = pathname.split('/')[1] as keyof typeof navOptions;
  const navItems = navOptions[type] || [];

  const authContext = useContext(AuthContext);

  if(!authContext) return null

  const { logout } = authContext

  return (
      <nav
        className={`flex flex-col h-screen z-5 transition-width duration-300  ${
          isOpen ? "w-75" : "w-16"
        }`}
        style={{ background: "var(--color-terciary)" }}
      >
        <button
          className={`p-4  focus:outline-none hover:bg-gray-700 ${
            isOpen ? "" : "mx-auto"
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {
          isOpen
          ?
            <FaTimes className="transition-transform duration-1200 text-primary" />
          :
            <FaBars className="transition-transform duration-1200 text-primary" />
          }
        </button>

        <Image src={logo} alt="Logo"  height={isOpen ? 100 : 40}  className={ 'mx-auto' } />

        <ul className="flex flex-col mt-4 space-y-1">
          {navItems.map(({ id, label, icon, href }) => {
            const isActive = pathname === href

            return (
              <li key={id}>
                <Link
                  href={href}
                  className={`text-primary flex items-center px-4 py-2 rounded-r-md
                    ${isActive ? "bg-blue-600 font-semibold" : "hover:bg-gray-700"}
                    ${!isOpen ? "justify-center" : ""}
                  `}
                >
                  <span className="text-lg">{icon}</span>
                  {isOpen && <span className="ml-3">{label}</span>}
                </Link>
              </li>
            )
          })}

          <li
            onClick={logout}
            className={`text-primary flex items-center cursor-pointer px-4 py-2 rounded-r-md hover:bg-gray-700
              ${isOpen ? "justify-start" : "justify-center"}`}
          >
            <FaSignOutAlt className="text-lg text-primary" />
            {isOpen && (
              <span className="ml-3">
                Sair
              </span>
            )}
          </li>
        </ul>


      </nav>
  );
}
