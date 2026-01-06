import { ArrowLeft } from 'lucide-react';
import './PageLayout.css';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
  onBack?: () => void;
}

export default function PageLayout({ title, children, onBack }: PageLayoutProps) {
  return (
    <div className="page-layout-container">
      <div className="book-page page-turn">
        {onBack && (
          <button className="back-btn" onClick={onBack}>
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
        )}

        <h2 className="illuminated-header">{title}</h2>

        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
}
