import { FC, useEffect, useState } from 'react';
import { Section, Cell, List } from '@telegram-apps/telegram-ui';
import DijestBlock from '@/components/DijestBlock/DijestBlock';
import { useMainButton } from '@telegram-apps/sdk-react';
import logo from '../../../assets/application.png';


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

// Sample data structure for digests with categories and news items

const category_1: Category ={
      id: 'category1',
      name: 'Тема категории 1',
      news: [
        {
          id: 'news1',
          title: 'Обновлённая Alexa с ИИ-функциями будет работать на модели Claude от Anthropic',
          description: 'Обновлённый голосовой помощник не будет работать на собственном ИИ от Amazon, пишет Reuters со ссылкой на источники...',
          image: logo,
          fullText: 'Полный текст новости 1...',
          variant: 'big-top',
        },
        {
          id: 'news2',
          title: 'Другая новость',
          description: 'Описание другой новости...',
          image: logo,
          fullText: 'Полный текст другой новости...',
          variant: 'small-right',
        }
      ]}
  
  const category_2: Category = {
    id: 'category2',
    name: 'Тема категории 2',
    news: [
      {
        id: 'news3',
        title: 'Ещё одна новость',
        description: 'Краткое описание ещё одной новости...',
        fullText: 'Полный текст ещё одной новости...',
        variant: 'no-image',
      },
    ],
  }

  const category_3: Category = {
    id: 'category3',
    name: 'Тема категории 3',
    news: [
      {
        id: 'news4',
        title: 'Новость из другой подборки',
        description: 'Описание новости из другой подборки...',
        image: logo,
        fullText: 'Полный текст новости из другой подборки...',
        variant: 'big-top',
      },
    ],
  }

const sampleDigests = [
  {
    id: '1',
    name: 'Подборка №1',
    categories: [
      category_1,
      category_2
    ],
  },
  {
    id: '2',
    name: 'Подборка №2',
    categories: [
      category_3
    ],
  },
  // Add more digests as needed
];

export const IndexPage: FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const mainButton = useMainButton(); // Initialize the Main Button hook

  useEffect(() => {
    if (selectedIndex !== null) {
      // Configure the main button when a digest is selected
      mainButton.setParams({
        text: 'Back to List',
        isVisible: true,
        isEnabled: true
      });
      mainButton.show(); // Explicitly show the main button

      const handleBackClick = () => {
        setSelectedIndex(null);
      };

      // Set up the click event listener
      mainButton.on("click", handleBackClick);

      return () => {
        // Clean up the click event listener
        mainButton.off("click", handleBackClick);
      };
    } else {
      // Hide the main button when no digest is selected
      mainButton.hide();
    }
  }, [selectedIndex, mainButton]);

  const handleObjectClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <List className="List">
      {selectedIndex === null ? (
        <Section header="Ваши подборки!" className="Section">
          {sampleDigests.map((digest, index) => (
            <Cell
              key={index}
              className="Cell"
              subtitle={`Name: ${digest.name}`}
              onClick={() => handleObjectClick(index)}
            >
              {digest.name}
            </Cell>
          ))}
        </Section>
      ) : (
        <DijestBlock
          dijestId={sampleDigests[selectedIndex].id}
          categories={sampleDigests[selectedIndex].categories}
        />
      )}
    </List>
  );
};

export default IndexPage;
