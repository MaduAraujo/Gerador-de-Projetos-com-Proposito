
import React from 'react';
import { ProjectIdea } from '../types';

interface ProjectCardProps {
  idea: ProjectIdea;
  index: number;
}

const icons = ["fa-rocket", "fa-seedling", "fa-comments"];
const colors = ["from-purple-600 to-indigo-600", "from-green-600 to-teal-600", "from-pink-600 to-rose-600"];

export const ProjectCard: React.FC<ProjectCardProps> = ({ idea, index }) => {
  const iconClass = icons[index % icons.length];
  const colorClass = colors[index % colors.length];

  return (
    <div className="bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
      <div className="p-6 flex items-start space-x-4">
        <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${colorClass} flex items-center justify-center`}>
            <i className={`fas ${iconClass} text-xl text-white`}></i>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{idea.titulo}</h3>
          <p className="text-gray-300 leading-relaxed">{idea.descricao}</p>
        </div>
      </div>
    </div>
  );
};
