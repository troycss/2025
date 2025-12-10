import SectionHeader from '../components/SectionHeader';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';
import styles from '../styles/pages/Projects.module.css';

export default function Projects() {
  return (
    <div className="section">
      <div className="container">
        <SectionHeader
          title="My Work"
          subtitle="A selection of film and television productions I've contributed to"
        />

        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
