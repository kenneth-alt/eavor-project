import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import CardsDisplay from './components/CardsDisplay';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cards, setCards] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async (searchQuery: string) => {
    setSearchTerm(searchQuery);
    if (!searchQuery) {
      setCards([]);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://api.scryfall.com/cards/search?q=${encodeURIComponent(
          searchQuery
        )}`
      );
      setCards(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  return (
    <div className="flex flex-col min-h-screen items-center">
      <Header />
      <main className="flex-1 flex flex-col py-2 lg:mx-16 xl:mx-16 w-full max-w-screen-lg mx-auto">
        <SearchBar onSearch={handleSearch} />
        <CardsDisplay
          cards={cards}
          searchTerm={searchTerm}
          isLoading={isLoading}
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;
