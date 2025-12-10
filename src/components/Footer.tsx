import { Film } from 'lucide-react';
import styles from '../styles/components/Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerText}>
            <p>&copy; {currentYear} Troy Gianopoulos. All rights reserved.</p>
          </div>
          <div className={styles.footerLinks}>
            <a
              href="https://www.imdb.com/name/nm4104645/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.imdbLink}
            >
              <Film size={20} />
              <span>IMDb Profile</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
