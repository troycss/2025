import { useState } from 'react';
import PageLayout from '../components/book/PageLayout';
import { generateSessionCode } from '../utils/dnd';
import './SessionPage.css';

interface SessionPageProps {
  onBack: () => void;
}

export default function SessionPage({ onBack }: SessionPageProps) {
  const [mode, setMode] = useState<'choose' | 'create' | 'join'>('choose');
  const [dmName, setDmName] = useState('');
  const [sessionCode, setSessionCode] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  const handleCreateSession = () => {
    if (!dmName.trim()) {
      alert('Please enter your name');
      return;
    }
    const code = generateSessionCode();
    setGeneratedCode(code);
    alert(`Session created! Code: ${code}`);
  };

  const handleJoinSession = () => {
    if (!playerName.trim() || !sessionCode.trim()) {
      alert('Please enter your name and session code');
      return;
    }
    alert(`Joining session: ${sessionCode}`);
  };

  if (mode === 'choose') {
    return (
      <PageLayout title="Session Management" onBack={onBack}>
        <div className="session-choice">
          <p className="session-intro">
            Start a new adventure or join an existing one
          </p>

          <div className="choice-buttons">
            <button className="btn-primary large-btn" onClick={() => setMode('create')}>
              Create Session (DM)
            </button>

            <button className="btn-secondary large-btn" onClick={() => setMode('join')}>
              Join Session (Player)
            </button>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (mode === 'create') {
    return (
      <PageLayout title="Create Session" onBack={() => setMode('choose')}>
        <div className="session-form">
          <div className="form-group">
            <label className="form-label" htmlFor="dm-name">
              Your Name (DM)
            </label>
            <input
              id="dm-name"
              type="text"
              className="form-input"
              value={dmName}
              onChange={(e) => setDmName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <button className="btn-primary" onClick={handleCreateSession}>
            Create Session
          </button>

          {generatedCode && (
            <div className="session-code-display">
              <h3>Session Code</h3>
              <div className="code-box">{generatedCode}</div>
              <p>Share this code with your players</p>
            </div>
          )}
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Join Session" onBack={() => setMode('choose')}>
      <div className="session-form">
        <div className="form-group">
          <label className="form-label" htmlFor="player-name">
            Your Name
          </label>
          <input
            id="player-name"
            type="text"
            className="form-input"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="session-code">
            Session Code
          </label>
          <input
            id="session-code"
            type="text"
            className="form-input"
            value={sessionCode}
            onChange={(e) => setSessionCode(e.target.value.toUpperCase())}
            placeholder="Enter 6-character code"
            maxLength={6}
          />
        </div>

        <button className="btn-primary" onClick={handleJoinSession}>
          Join Session
        </button>
      </div>
    </PageLayout>
  );
}
