import React, { useState, useRef } from 'react';
import './DijestBlock.css';
import NewsBlock from '../NewsBlock/NewsBlock.tsx';
import { IconButton } from '@telegram-apps/telegram-ui';

interface Category {
  id: string;
  name: string;
  news: Array<{
    id: string;
    title: string;
    description: string;
    image?: string;
    fullText: string;
    variant: 'big-top' | 'small-right' | 'no-image';
  }>;
}

interface DijestBlockProps {
  dijestId: string;
  categories: Category[];
}

const DijestBlock: React.FC<DijestBlockProps> = ({ dijestId, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const swipeDistance = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50; // Minimum distance required to detect swipe

    if (swipeDistance > swipeThreshold) {
      handleSwipeLeft();
    } else if (swipeDistance < -swipeThreshold) {
      handleSwipeRight();
    }

    // Reset touch positions
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleSwipeLeft = () => {
    const currentIndex = categories.findIndex(category => category.id === selectedCategory);
    if (currentIndex < categories.length - 1) {
      setSelectedCategory(categories[currentIndex + 1].id);
    }
  };

  const handleSwipeRight = () => {
    const currentIndex = categories.findIndex(category => category.id === selectedCategory);
    if (currentIndex > 0) {
      setSelectedCategory(categories[currentIndex - 1].id);
    }
  };

  const handleFeedback = (type: 'like' | 'dislike') => {
    alert(`You clicked ${type}`); // Placeholder for like/dislike logic
  };

  const handleReportProblem = () => {
    alert('Report a problem clicked!'); // Replace with actual problem reporting logic
  };

  return (
    <div
      className="dijest-block"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <header className="dijest-header">
        <h1>Подборка №{dijestId}</h1>
        <div className="category-chooser">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </header>
      <div className="news-container">
        {categories
          .find((category) => category.id === selectedCategory)
          ?.news.map((newsItem) => (
            <NewsBlock
              key={newsItem.id}
              title={newsItem.title}
              description={newsItem.description}
              image={newsItem.image}
              fullText={newsItem.fullText}
              variant={newsItem.variant}
            />
          ))}
      </div>
      <div className="feedback-container">
        <div className="feedback-buttons">
          <IconButton content="Like" onClick={() => handleFeedback('like')} />
          <IconButton content="Dislike" onClick={() => handleFeedback('dislike')} />
        </div>
        <IconButton content="Report a problem" onClick={handleReportProblem} />
      </div>
    </div>
  );
};

export default DijestBlock;
