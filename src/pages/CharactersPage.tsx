import PageLayout from '../components/book/PageLayout';

interface CharactersPageProps {
  onBack: () => void;
}

export default function CharactersPage({ onBack }: CharactersPageProps) {
  return (
    <PageLayout title="My Characters" onBack={onBack}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p style={{ fontSize: '1.2rem', color: 'var(--ink-light)' }}>
          Character management coming soon!
        </p>
        <p style={{ marginTop: '1rem' }}>
          Create and manage your D&D 5E characters here.
        </p>
      </div>
    </PageLayout>
  );
}
