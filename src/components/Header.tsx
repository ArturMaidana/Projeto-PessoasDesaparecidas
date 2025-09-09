"use client";

import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="w-full bg-[#2A2A2A] h-36 relative">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <Image
            className="logo2Icon"
            width={57}
            height={75}
            alt="Logo Polícia Civil MT"
            src="/images/logo-2.png"
          />
          <div className="text-white">
            <div className="text-xl font-bold">Polícia Judiciária Civil</div>
            <div className="text-[#D1D5DC] text-base">
              Estado de Mato Grosso
            </div>
          </div>
        </div>

        {/* Social Media and Search */}
        <div className="flex items-center space-x-6">
          {/* Social Media Icons */}
          <div className="flex items-center space-x-4">
            <Image
              width={16}
              height={16}
              alt="Instagram"
              src="/images/insta.svg"
            />
            <Image
              width={16}
              height={16}
              alt="Facebook"
              src="/images/facebook.svg"
            />
            <Image
              width={16}
              height={16}
              alt="Twitter"
              src="/images/twitter.svg"
            />
            <Image
              width={16}
              height={16}
              alt="YouTube"
              src="/images/youtube.svg"
            />
            <Image width={16} height={16} alt="Sinal" src="/images/sinal.svg" />
          </div>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar no portal"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="header-search-input"
            />
          </div>
        </div>
      </div>

      {/* Navigation Bar - Dourado */}
      <div className="w-full bg-[#BEA55A] h-12 absolute bottom-0">
        <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
          <nav className="flex items-center space-x-8">
            <a href="#" className="nav-menu-item">
              Início
            </a>

            <div className="nav-menu-item">
              <span>Registrar Desaparecimento</span>
              <Image width={16} height={16} alt="" src="/images/arrow.svg" />
            </div>

            <div className="nav-menu-item">
              <span>Unidades Policiais</span>
              <Image width={16} height={16} alt="" src="/images/arrow.svg" />
            </div>

            <div className="nav-menu-item">
              <span>Como Ajudar</span>
              <Image width={16} height={16} alt="" src="/images/arrow.svg" />
            </div>

            <div className="nav-menu-item">
              <span>Orientações</span>
              <Image width={16} height={16} alt="" src="/images/arrow.svg" />
            </div>

            <div className="nav-menu-item">
              <span>Contatos</span>
              <Image width={16} height={16} alt="" src="/images/arrow.svg" />
            </div>
          </nav>

          {/* Denúncia Anônima */}
          <div className="flex items-center space-x-3">
            <Image width={18} height={18} alt="" src="/images/arrow.svg" />
            <span className="text-[#0D0D0D] font-medium text-sm">
              Denúncia Anônima
            </span>
            <Image width={16} height={16} alt="" src="/images/phone.svg" />
          </div>
        </div>
      </div>
    </div>
  );
}
