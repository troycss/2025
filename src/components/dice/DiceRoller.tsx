import { useState } from 'react';
import { Dices, Sparkles, TrendingUp, TrendingDown, Trash2 } from 'lucide-react';
import './DiceRoller.css';

export interface DiceRoll {
  id: string;
  type: string;
  result: number;
  breakdown: number[];
  description: string;
  timestamp: number;
  isCritical?: boolean;
  isCriticalFail?: boolean;
}

interface DiceRollerProps {
  onRoll?: (roll: DiceRoll) => void;
  showHistory?: boolean;
}

const DICE_TYPES = [
  { sides: 4, label: 'd4', color: '#4CAF50' },
  { sides: 6, label: 'd6', color: '#2196F3' },
  { sides: 8, label: 'd8', color: '#9C27B0' },
  { sides: 10, label: 'd10', color: '#FF9800' },
  { sides: 12, label: 'd12', color: '#E91E63' },
  { sides: 20, label: 'd20', color: '#D4AF37' },
  { sides: 100, label: 'd100', color: '#8B0000' },
];

export default function DiceRoller({ onRoll, showHistory = true }: DiceRollerProps) {
  const [history, setHistory] = useState<DiceRoll[]>([]);
  const [customRoll, setCustomRoll] = useState('');
  const [description, setDescription] = useState('');
  const [isRolling, setIsRolling] = useState(false);

  function rollDie(sides: number): number {
    return Math.floor(Math.random() * sides) + 1;
  }

  function createRoll(type: string, result: number, breakdown: number[], desc: string = ''): DiceRoll {
    const isCritical = type.includes('d20') && breakdown.length === 1 && breakdown[0] === 20;
    const isCriticalFail = type.includes('d20') && breakdown.length === 1 && breakdown[0] === 1;

    const roll: DiceRoll = {
      id: `${Date.now()}_${Math.random()}`,
      type,
      result,
      breakdown,
      description: desc || description,
      timestamp: Date.now(),
      isCritical,
      isCriticalFail
    };

    return roll;
  }

  function addRollToHistory(roll: DiceRoll) {
    setHistory(prev => [roll, ...prev].slice(0, 20));
    setDescription('');
    onRoll?.(roll);

    setIsRolling(true);
    setTimeout(() => setIsRolling(false), 600);
  }

  function handleQuickRoll(sides: number) {
    const result = rollDie(sides);
    const roll = createRoll(`d${sides}`, result, [result]);
    addRollToHistory(roll);
  }

  function handleCustomRoll() {
    const expression = customRoll.trim();
    if (!expression) return;

    const match = expression.match(/^(\d+)?d(\d+)([+\-]\d+)?$/i);
    if (!match) {
      alert('Invalid format. Use: d20, 2d6, 3d8+5, 1d20-2');
      return;
    }

    const count = parseInt(match[1] || '1');
    const sides = parseInt(match[2]);
    const modifier = parseInt(match[3] || '0');

    if (count > 100 || sides > 1000) {
      alert('Too many dice or sides!');
      return;
    }

    const rolls: number[] = [];
    for (let i = 0; i < count; i++) {
      rolls.push(rollDie(sides));
    }

    const sum = rolls.reduce((a, b) => a + b, 0);
    const result = sum + modifier;

    const modifierStr = modifier !== 0 ? (modifier > 0 ? `+${modifier}` : `${modifier}`) : '';
    const type = `${count}d${sides}${modifierStr}`;

    const roll = createRoll(type, result, rolls);
    addRollToHistory(roll);
    setCustomRoll('');
  }

  function handleAdvantage() {
    const roll1 = rollDie(20);
    const roll2 = rollDie(20);
    const result = Math.max(roll1, roll2);

    const roll = createRoll('d20 (Advantage)', result, [roll1, roll2], description || 'Advantage Roll');
    addRollToHistory(roll);
  }

  function handleDisadvantage() {
    const roll1 = rollDie(20);
    const roll2 = rollDie(20);
    const result = Math.min(roll1, roll2);

    const roll = createRoll('d20 (Disadvantage)', result, [roll1, roll2], description || 'Disadvantage Roll');
    addRollToHistory(roll);
  }

  function clearHistory() {
    if (confirm('Clear all roll history?')) {
      setHistory([]);
    }
  }

  return (
    <div className="dice-roller">
      <div className="dice-section">
        <h3 className="dice-section-title">
          <Dices size={24} className="dice-icon" />
          Quick Roll
        </h3>
        <div className="dice-grid">
          {DICE_TYPES.map(dice => (
            <button
              key={dice.sides}
              onClick={() => handleQuickRoll(dice.sides)}
              className={`dice-button ${isRolling ? 'rolling' : ''}`}
              style={{ borderColor: dice.color }}
            >
              <Dices size={32} style={{ color: dice.color }} />
              <span className="dice-label">{dice.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="dice-section">
        <h3 className="dice-section-title">
          <Sparkles size={24} className="dice-icon" />
          Advantage / Disadvantage
        </h3>
        <div className="advantage-buttons">
          <button onClick={handleAdvantage} className="btn-advantage">
            <TrendingUp size={20} />
            <span>Advantage</span>
            <span className="dice-detail">Roll 2d20, take higher</span>
          </button>
          <button onClick={handleDisadvantage} className="btn-disadvantage">
            <TrendingDown size={20} />
            <span>Disadvantage</span>
            <span className="dice-detail">Roll 2d20, take lower</span>
          </button>
        </div>
      </div>

      <div className="dice-section">
        <h3 className="dice-section-title">Custom Roll</h3>
        <div className="custom-roll-form">
          <div className="form-group">
            <label className="form-label">Description (optional)</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input"
              placeholder="e.g., Longsword Attack"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Dice Expression</label>
            <div className="custom-roll-input-group">
              <input
                type="text"
                value={customRoll}
                onChange={(e) => setCustomRoll(e.target.value)}
                className="form-input"
                placeholder="e.g., 2d6+3, 1d20, 8d8-2"
                onKeyDown={(e) => e.key === 'Enter' && handleCustomRoll()}
              />
              <button onClick={handleCustomRoll} className="btn-primary btn-roll">
                Roll
              </button>
            </div>
            <small className="help-text">
              Format: [count]d[sides][+/-modifier] (e.g., 3d6+5)
            </small>
          </div>
        </div>
      </div>

      {showHistory && (
        <div className="dice-section">
          <div className="history-header">
            <h3 className="dice-section-title">Roll History</h3>
            {history.length > 0 && (
              <button onClick={clearHistory} className="btn-clear" title="Clear History">
                <Trash2 size={16} />
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="empty-history">
              <Dices size={48} className="empty-icon" />
              <p>No rolls yet</p>
              <small>Your dice rolls will appear here</small>
            </div>
          ) : (
            <div className="scroll-container">
              <div className="roll-history">
                {history.map(roll => (
                  <div
                    key={roll.id}
                    className={`roll-item ${roll.isCritical ? 'critical-success' : ''} ${roll.isCriticalFail ? 'critical-fail' : ''}`}
                  >
                    {roll.description && (
                      <div className="roll-description">{roll.description}</div>
                    )}
                    <div className="roll-header">
                      <span className="roll-type">{roll.type}</span>
                      <span className={`roll-result ${roll.isCritical ? 'result-critical' : ''} ${roll.isCriticalFail ? 'result-fail' : ''}`}>
                        {roll.result}
                      </span>
                    </div>
                    <div className="roll-breakdown">
                      [{roll.breakdown.join(', ')}]
                      {roll.isCritical && <span className="critical-tag">CRITICAL!</span>}
                      {roll.isCriticalFail && <span className="fail-tag">CRITICAL FAIL!</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
