import PageLayout from '../components/book/PageLayout';
import DiceRoller from '../components/dice/DiceRoller';

interface DicePageProps {
  onBack: () => void;
}

export default function DicePage({ onBack }: DicePageProps) {
  return (
    <PageLayout title="Dice Roller" onBack={onBack}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <p style={{
          textAlign: 'center',
          marginBottom: '2rem',
          color: 'var(--ink-light)',
          fontSize: '1.1rem'
        }}>
          Roll all your favorite polyhedral dice with advantage, disadvantage, and custom expressions.
        </p>
        <DiceRoller showHistory={true} />
      </div>
    </PageLayout>
  );
}
