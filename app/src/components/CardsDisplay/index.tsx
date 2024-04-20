import { useState } from 'react';
import { PrevButton, NextButton } from '../Buttons';
import landing_img from '../../assets/imgs/landing_page.jpg';

interface Card {
  name: string;
  set_name: string;
  cardmarket_id: string;
  rarity: string;
  image_uris: { small: string; normal: string; large: string };
}

interface CardsDisplayProps {
  cards: Card[];
  searchTerm: string;
  isLoading: boolean;
}

const CardsDisplay = ({ cards, searchTerm, isLoading }: CardsDisplayProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <div className="flex flex-col items-center">
      {isLoading ? (
        <div className="flex justify-center items-center h-full mt-16 lg:mt-24 xl:mt-24 text-center text-lg text-stone-400">
          Loading...
        </div>
      ) : searchTerm.trim() === '' ? (
        <div className="flex flex-col justify-center items-center mb-2">
          <img src={landing_img} alt="magic image" className="p-4 mx-auto" />
          <div className="text-center text-lg text-stone-400">
            Welcome to Magic, Find your card!
          </div>
        </div>
      ) : currentCards.length > 0 ? (
        <>
          <div className="flex justify-end w-full p-4">
            <PrevButton
              onClick={() =>
                setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)
              }
              disabled={currentPage === 1}
            />
            <NextButton
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLastCard >= cards.length}
            />
          </div>
          <div className="flex justify-start w-full p-4">
            <p className="text-left text-lg text-stone-400">
              {`Showing ${indexOfFirstCard + 1} - ${Math.min(
                indexOfLastCard,
                cards.length
              )} of ${cards.length} cards`}
            </p>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-full mt-16 lg:mt-24 xl:mt-24">
          <div className=" text-center text-lg text-stone-400">
            {`Oopppss!`} <br /> <br />
            {`It's Okay to miss a turn in this noble Quest.`}
            <br />
            {`We did not find a card for "${searchTerm}".`}
            <br />
            {`Please search for another term!`}
          </div>
        </div>
      )}

      {currentCards.length > 0 && (
        <div className="grid grid-cols-1 gap-4 justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 mt-4">
          {currentCards.map((card, index) => (
            <div
              key={index}
              className="m-2 p-2 flex flex-col justify-center items-center"
            >
              <img
                src={card.image_uris?.normal}
                alt={card.name}
                className="w-full h-auto max-w-xs"
              />
              <div>
                <p className="text-orange-500 mt-2">
                  Name: <span className="text-stone-400">{card.name}</span>
                </p>
                <p className="text-orange-500">
                  Set Name:{' '}
                  <span className="text-stone-400">{card.set_name}</span>
                </p>
                <p className="text-orange-500">
                  Number:{' '}
                  <span className="text-stone-400">{card.cardmarket_id}</span>
                </p>
                <p className="text-orange-500">
                  Rarity: <span className="text-stone-400">{card.rarity}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardsDisplay;
