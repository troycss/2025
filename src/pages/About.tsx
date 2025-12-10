import SectionHeader from '../components/SectionHeader';
import SkillsList from '../components/SkillsList';
import { biography, skills } from '../data/projects';
import styles from '../styles/pages/About.module.css';

export default function About() {
  return (
    <div className="section">
      <div className="container">
        <SectionHeader
          title="About Me"
          subtitle="Film production professional with a passion for storytelling"
        />

        <div className={styles.content}>
          <div className={styles.biography}>
            {biography.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className={styles.skillsSection}>
            <h3 className={styles.skillsTitle}>Skills & Expertise</h3>
            <SkillsList skills={skills} />
          </div>
        </div>
      </div>
    </div>
  );
}
