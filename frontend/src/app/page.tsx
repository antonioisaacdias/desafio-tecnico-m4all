
'use client';

import Link from 'next/link';
import Image from 'next/image';
import './globals.css';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">

      <section className="text-center py-16 px-6">
        <div className="mb-8 flex justify-center">
          <Image 
            src="/assets/media4all-logo.png"
            alt="Media4All Logo" 
            width={200}
            height={80}
            className="mb-6"
          />
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Sistema de Gestão de Impressoras
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Uma solução completa para gerenciar impressoras em sua organização. 
          Monitore status, sincronize dados externos e acompanhe estatísticas de performance 
          em tempo real.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/impressoras" 
            className="bg-brand text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand/90 transition-colors"
          >
            Gerenciar Impressoras
          </Link>
          <Link 
            href="/estatisticas" 
            className="border border-brand text-brand px-8 py-3 rounded-lg font-semibold hover:bg-brand/5 transition-colors"
          >
            Ver Estatísticas
          </Link>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50 rounded-lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tecnologias Utilizadas
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Desenvolvido com as tecnologias mais modernas para garantir performance, 
            escalabilidade e manutenibilidade.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Frontend</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• <strong>Next.js 14</strong> - Framework React com SSR</li>
              <li>• <strong>TypeScript</strong> - Tipagem estática</li>
              <li>• <strong>Tailwind CSS</strong> - Framework CSS utility-first</li>
              <li>• <strong>FontAwesome</strong> - Ícones profissionais</li>
              <li>• <strong>React Hot Toast</strong> - Notificações elegantes</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Backend</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• <strong>Spring Boot 3</strong> - Framework Java</li>
              <li>• <strong>Spring Data JPA</strong> - Persistência de dados</li>
              <li>• <strong>MySQL</strong> - Banco de dados relacional</li>
              <li>• <strong>Docker</strong> - Containerização</li>
              <li>• <strong>Maven</strong> - Gerenciamento de dependências</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Pronto para Começar?
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Explore o sistema navegando pelas diferentes seções. Gerencie suas impressoras 
          e acompanhe as estatísticas de sincronização em tempo real.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/impressoras" 
            className="bg-brand text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand/90 transition-colors"
          >
            Começar Agora
          </Link>
        </div>
      </section>
    </div>
  );
}