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
    <div className="flex flex-col gap-5 px-3 pt-5 pb-8 max-w-lg mx-auto w-full">
      {level.cards.map((card, i) => (
        <div
          key={card.id}
          className="flex flex-col gap-2.5"
          style={{ animation: `slideFromRight 0.35s ease ${i * 0.07}s both` }}
        >
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
