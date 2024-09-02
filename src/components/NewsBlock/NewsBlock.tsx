import React, { useState } from 'react';
import './NewsBlock.css';

interface NewsBlockProps {
  title: string;
  description: string;
  image?: string; // Image is optional
  fullText: string;
  variant: 'big-top' | 'small-right' | 'no-image'; // Variant prop to specify layout
}

const NewsBlock: React.FC<NewsBlockProps> = ({ title, description, image, fullText, variant }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`news-block ${variant}`}>
      {variant === 'big-top' && image && (
        <img src={image} alt={title} className="news-image-top" />
      )}
      <div className={`news-content ${!image ? 'no-image' : ''}`}>
        <h2 className="news-title">{title}</h2>
        {variant === 'small-right' && image && (
          <img src={image} alt={title} className="news-image-right" />
        )}
        <p className="news-description">{description}</p>
        {isExpanded && <p className="news-full-text">{fullText}</p>}
        <button className="expand-button" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'Свернуть' : 'Читать далее...'}
        </button>
      </div>
    </div>
  );
};

export default NewsBlock;
