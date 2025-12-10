import type { Skill } from '../data/projects';
import styles from '../styles/components/SkillsList.module.css';

interface SkillsListProps {
  skills: Skill[];
}

export default function SkillsList({ skills }: SkillsListProps) {
  return (
    <div className={styles.skillsGrid}>
      {skills.map((skill) => (
        <div key={skill.id} className={styles.skillCard}>
          <span className={styles.skillName}>{skill.name}</span>
        </div>
      ))}
    </div>
  );
}
