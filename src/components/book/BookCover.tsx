import { BookOpen, Users, Dices, ScrollText } from 'lucide-react';
import './BookCover.css';

interface BookCoverProps {
  onNavigate: (page: string) => void;
}

export default function BookCover({ onNavigate }: BookCoverProps) {
  return (
    <div className="book-cover-container">
      <div className="book-cover">
        <div className="book-spine"></div>
        <div className="book-front">
          <div className="book-title">
            <h1>D&D Companion</h1>
            <p className="book-subtitle">Fifth Edition</p>
          </div>

          <div className="book-ornament">⚔️</div>

          <div className="menu-options">
            <button className="menu-btn" onClick={() => onNavigate('session')}>
              <Users size={24} />
              <span>Join/Create Session</span>
            </button>

            <button className="menu-btn" onClick={() => onNavigate('characters')}>
              <BookOpen size={24} />
              <span>My Characters</span>
            </button>

            <button className="menu-btn" onClick={() => onNavigate('dice')}>
              <Dices size={24} />
              <span>Dice Roller</span>
            </button>

            <button className="menu-btn" onClick={() => onNavigate('reference')}>
              <ScrollText size={24} />
              <span>Quick Reference</span>
            </button>
          </div>

          <div className="book-footer">
            <p>Tap any option to begin your adventure</p>
          </div>
        </div>
      </div>
    </div>
  );
}
