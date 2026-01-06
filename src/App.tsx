import { useState } from 'react';
import BookCover from './components/book/BookCover';
import SessionPage from './pages/SessionPage';
import CharactersPage from './pages/CharactersPage';
import DicePage from './pages/DicePage';
import ReferencePage from './pages/ReferencePage';
import FloatingDiceButton from './components/dice/FloatingDiceButton';

type Page = 'cover' | 'session' | 'characters' | 'dice' | 'reference';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('cover');

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  const goHome = () => {
    setCurrentPage('cover');
  };

  return (
    <div className="app">
      {currentPage === 'cover' && <BookCover onNavigate={navigateTo} />}
      {currentPage === 'session' && <SessionPage onBack={goHome} />}
      {currentPage === 'characters' && <CharactersPage onBack={goHome} />}
      {currentPage === 'dice' && <DicePage onBack={goHome} />}
      {currentPage === 'reference' && <ReferencePage onBack={goHome} />}

      {currentPage !== 'cover' && currentPage !== 'dice' && <FloatingDiceButton />}
    </div>
  );
}

export default App;
