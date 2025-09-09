import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema de Pessoas Desaparecidas - MT",
  description:
    "Sistema para consulta de pessoas desaparecidas da Polícia Judiciária Civil de Mato Grosso",
  keywords: ["pessoas desaparecidas", "polícia civil", "mato grosso", "busca"],
  authors: [{ name: "Desenvolvedor" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">MT</span>
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">
                    Pessoas Desaparecidas
                  </h1>
                  <p className="text-xs text-gray-500">
                    Polícia Judiciária Civil - Mato Grosso
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Central de Atendimento</p>
                <p className="text-sm font-medium text-blue-600">
                  0800 647 7900
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        <footer className="bg-gray-800 text-white py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Polícia Judiciária Civil de Mato Grosso
                </h3>
                <p className="text-gray-300 text-sm mb-2">
                  Rua Engenheiro Edgar Prado, 215
                </p>
                <p className="text-gray-300 text-sm mb-2">
                  Centro Político Administrativo
                </p>
                <p className="text-gray-300 text-sm">
                  CEP 78.049-909 – Cuiabá – MT
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contatos</h3>
                <p className="text-gray-300 text-sm mb-2">
                  Telefone: (65) 3613-7900
                </p>
                <p className="text-gray-300 text-sm mb-2">
                  Ouvidoria: 0800 647 7900
                </p>
                <p className="text-gray-300 text-sm">
                  CNPJ: 06.284.531/0001-30
                </p>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center">
              <p className="text-gray-400 text-sm">
                © 2025 Polícia Judiciária Civil de Mato Grosso. Todos os
                direitos reservados.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
