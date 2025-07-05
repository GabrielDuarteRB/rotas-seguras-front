"use client";

import { useState, useContext } from "react";
import { FaUser, FaVideo, FaShareAlt, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import Link from 'next/link'
import Image from "next/image";
import logo from "@/assets/img/logo.png";
import { AuthContext } from '@/context/AuthContext';

const navItems = [
  { id: 1, label: "nav 1", href: '/', icon: <FaUser /> },
  { id: 2, label: "nav 2", href: '/', icon: <FaVideo /> },
  { id: 3, label: "nav 3", href: '/', icon: <FaShareAlt /> },
];

export default function MenuSideBar() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeId, setActiveId] = useState(1);

  const authContext = useContext(AuthContext);

  if(!authContext) return null

  const { logout } = authContext

  return (
      <nav
        className={`flex flex-col h-screen z-50 transition-width duration-300  ${
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
          {navItems.map(({ id, label, icon, href }) => (
            <li key={id}>
              <Link
                href={href}
                className={`text-primary flex items-center cursor-pointer px-4 py-2 rounded-r-md
                  ${
                    activeId === id
                      ? "bg-blue-600 font-semibold"
                      : "hover:bg-gray-700"
                  }`}
              >
                <span className="text-lg text-primary">{icon}</span>
                {isOpen && <span className="ml-3">{label}</span>}
              </Link>
            </li>
          ))}

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
