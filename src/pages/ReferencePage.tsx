import PageLayout from '../components/book/PageLayout';

interface ReferencePageProps {
  onBack: () => void;
}

export default function ReferencePage({ onBack }: ReferencePageProps) {
  return (
    <PageLayout title="Quick Reference" onBack={onBack}>
      <div style={{ padding: '1rem' }}>
        <section style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: 'var(--gold)', marginBottom: '0.5rem' }}>Ability Checks</h3>
          <p>Roll a d20 and add your ability modifier. Meet or exceed the DC to succeed.</p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: 'var(--gold)', marginBottom: '0.5rem' }}>Combat Actions</h3>
          <p>
            <strong>Attack:</strong> Roll d20 + modifiers vs. target AC<br />
            <strong>Dash:</strong> Move up to your speed again<br />
            <strong>Dodge:</strong> Attacks against you have disadvantage
          </p>
        </section>

        <section>
          <h3 style={{ color: 'var(--gold)', marginBottom: '0.5rem' }}>Advantage/Disadvantage</h3>
          <p>
            <strong>Advantage:</strong> Roll 2d20, take the higher<br />
            <strong>Disadvantage:</strong> Roll 2d20, take the lower
          </p>
        </section>
      </div>
    </PageLayout>
  );
}
