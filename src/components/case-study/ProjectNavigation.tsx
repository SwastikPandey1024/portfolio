import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FLAGSHIP_PROJECTS } from '@/data/projects';

export interface ProjectNavigationProps {
  currentProjectId: 'salespulse' | 'docuchat' | 'meli' | 'medvision';
}

export const ProjectNavigation: React.FC<ProjectNavigationProps> = ({ currentProjectId }) => {
  const currentProject = FLAGSHIP_PROJECTS.find((p) => p.id === currentProjectId);
  if (!currentProject) return null;

  const prevProject = FLAGSHIP_PROJECTS.find((p) => p.id === currentProject.prevProjectId);
  const nextProject = FLAGSHIP_PROJECTS.find((p) => p.id === currentProject.nextProjectId);

  return (
    <nav
      aria-label="Adjacent project case study navigation"
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-16 pt-12 border-t border-border/80"
    >
      {/* Previous Project Link */}
      {prevProject && (
        <Link
          to={`/work/${prevProject.id}`}
          className="surface-card p-6 flex flex-col justify-between group hover:border-border-highlight transition-all"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-content-muted mb-3">
            <ArrowLeft className="w-4 h-4 text-semantic-cyan group-hover:-translate-x-1 transition-transform" />
            <span>PREVIOUS SYSTEM</span>
          </div>
          <div>
            <span className="font-mono text-xs text-content-subtle block mb-1">
              {prevProject.numericId} // {prevProject.domain}
            </span>
            <span className="font-display font-bold text-xl text-content-primary group-hover:text-semantic-cyan transition-colors">
              {prevProject.title}
            </span>
          </div>
        </Link>
      )}

      {/* Next Project Link */}
      {nextProject && (
        <Link
          to={`/work/${nextProject.id}`}
          className="surface-card p-6 flex flex-col justify-between sm:items-end sm:text-right group hover:border-border-highlight transition-all"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-content-muted mb-3">
            <span>NEXT SYSTEM</span>
            <ArrowRight className="w-4 h-4 text-semantic-cyan group-hover:translate-x-1 transition-transform" />
          </div>
          <div>
            <span className="font-mono text-xs text-content-subtle block mb-1">
              {nextProject.numericId} // {nextProject.domain}
            </span>
            <span className="font-display font-bold text-xl text-content-primary group-hover:text-semantic-cyan transition-colors">
              {nextProject.title}
            </span>
          </div>
        </Link>
      )}
    </nav>
  );
};
