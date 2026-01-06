import { useState } from 'react';
import { Dices, X } from 'lucide-react';
import DiceRoller from './DiceRoller';
import './FloatingDiceButton.css';

export default function FloatingDiceButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="floating-dice-button"
        onClick={() => setIsOpen(!isOpen)}
        title="Quick Dice Roller"
      >
        <Dices size={28} />
      </button>

      <div className={`dice-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="dice-sidebar-header">
          <h2 className="dice-sidebar-title">
            <Dices size={24} className="dice-icon" />
            Quick Roll
          </h2>
          <button
            className="dice-sidebar-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close dice roller"
          >
            <X size={24} />
          </button>
        </div>
        <div className="dice-sidebar-content">
          <DiceRoller showHistory={true} />
        </div>
      </div>

      {isOpen && (
        <div
          className="dice-sidebar-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
