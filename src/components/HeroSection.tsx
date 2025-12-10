import { Link } from 'react-router-dom';
import styles from '../styles/components/HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Troy Gianopoulos</h1>
          <p className={styles.heroSubtitle}>Film Production Professional & Web Developer</p>
          <p className={styles.heroDescription}>
            With extensive experience in high-profile film and television production,
            I bring the same dedication and attention to detail to every project I undertake.
          </p>
          <div className={styles.heroButtons}>
            <Link to="/projects" className="btn btn-primary">View My Work</Link>
            <Link to="/contact" className="btn btn-secondary">Get In Touch</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
