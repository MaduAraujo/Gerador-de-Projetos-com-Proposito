
import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputArea } from './components/InputArea';
import { ProjectCard } from './components/ProjectCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { generateProjectIdeas } from './services/geminiService';
import { ProjectIdea } from './types';

const App: React.FC = () => {
  const [passions, setPassions] = useState<string>('');
  const [skills, setSkills] = useState<string>('');
  const [projectIdeas, setProjectIdeas] = useState<ProjectIdea[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateMission = async () => {
    if (!passions || !skills) {
      setError('Por favor, preencha os campos de paixões e habilidades.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setProjectIdeas([]);

    try {
      const ideas = await generateProjectIdeas(passions, skills);
      setProjectIdeas(ideas);
    } catch (err) {
      console.error(err);
      setError('Ocorreu um erro ao gerar as ideias. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-sans">
      <main className="container mx-auto px-4 py-8 md:py-16">
        <Header />
        
        <div className="max-w-2xl mx-auto mt-10 bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputArea
              id="passions"
              label="Suas Paixões"
              placeholder="Ex: sustentabilidade, educação, arte..."
              value={passions}
              onChange={(e) => setPassions(e.target.value)}
              disabled={isLoading}
            />
            <InputArea
              id="skills"
              label="Suas Habilidades"
              placeholder="Ex: programação, design, comunicação..."
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleGenerateMission}
              disabled={isLoading}
              className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-bold py-3 px-12 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 shadow-lg"
            >
              {isLoading ? 'Gerando...' : 'Gerar Missão'}
            </button>
          </div>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          {isLoading && <LoadingSpinner />}
          {error && <p className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</p>}
          
          {!isLoading && projectIdeas.length === 0 && !error && (
             <div className="text-center text-gray-400 py-10">
                <i className="fas fa-lightbulb fa-3x mb-4 text-gray-500"></i>
                <p>Suas ideias de projeto aparecerão aqui.</p>
             </div>
          )}

          {!isLoading && projectIdeas.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Suas Missões de Projeto</h2>
              {projectIdeas.map((idea, index) => (
                <ProjectCard key={index} idea={idea} index={index} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
