import Image from 'next/image';
import NavLi from './NavLi';

export default function Header() {
  return (
    <header className="bg-backgroundSecondary flex items-center justify-between shadow-md h-16 flex-shrink-0">
      <Image src="/assets/media4all-logo.png" alt="Logo" className="h-12 w-auto ml-10" />

      <nav className="flex-1 flex h-full ml-10">
        <ul className="flex space-x-4 justify-center h-full items-center">
          <NavLi uri="/" text="Home" />
          <NavLi uri="/impressoras" text="Gestão de Impressoras" />
          <NavLi uri="/estatisticas" text="Estatísticas de Sincronização" />
        </ul>
      </nav>
    </header>
  );
}
