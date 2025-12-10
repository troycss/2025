import { Film } from 'lucide-react';
import type { Project } from '../data/projects';
import styles from '../styles/components/ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <Film size={24} className={styles.icon} />
        <span className={styles.category}>{project.category}</span>
      </div>
      <h3 className={styles.title}>{project.title}</h3>
      <ul className={styles.credits}>
        {project.credits.map((credit, index) => (
          <li key={index} className={styles.credit}>{credit}</li>
        ))}
      </ul>
    </div>
  );
}
