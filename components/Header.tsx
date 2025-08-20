
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">
          Gerador de Projetos com Propósito
        </span>
      </h1>
      <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300">
        Conecte suas paixões e habilidades para criar projetos que fazem a diferença.
      </p>
    </header>
  );
};
