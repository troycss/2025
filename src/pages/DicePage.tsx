import PageLayout from '../components/book/PageLayout';

interface DicePageProps {
  onBack: () => void;
}

export default function DicePage({ onBack }: DicePageProps) {
  return (
    <PageLayout title="Dice Roller" onBack={onBack}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p style={{ fontSize: '1.2rem', color: 'var(--ink-light)' }}>
          Dice roller coming soon!
        </p>
        <p style={{ marginTop: '1rem' }}>
          Roll all your favorite polyhedral dice here.
        </p>
      </div>
    </PageLayout>
  );
}
