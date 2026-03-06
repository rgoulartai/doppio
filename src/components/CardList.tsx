// src/components/CardList.tsx
import { VideoCard } from './VideoCard';
import { TryItButton } from './TryItButton';
import type { Level } from '../types/content';

interface CardListProps {
  level: Level;
  completedCards: Record<string, boolean>;
  onCardComplete: (card: 1 | 2 | 3) => void;
}

export function CardList({ level, completedCards, onCardComplete }: CardListProps) {
  return (
    <div className="flex flex-col gap-6 p-4 max-w-lg mx-auto w-full">
      {level.cards.map((card) => (
        <div key={card.id} className="flex flex-col gap-3">
          <VideoCard
            card={card}
            isCompleted={completedCards[`card_${card.card}`] ?? false}
            onComplete={() => onCardComplete(card.card as 1 | 2 | 3)}
          />
          <TryItButton
            card={card}
            level={card.level as 1 | 2 | 3}
            cardIndex={card.card as 1 | 2 | 3}
          />
        </div>
      ))}
    </div>
  );
}
