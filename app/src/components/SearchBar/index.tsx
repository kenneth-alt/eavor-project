import { useState, useEffect, ChangeEvent } from 'react';

interface SearchBarProps {
  onSearch: (searchQuery: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(inputValue.trim());
    }, 1000);

    return () => clearTimeout(handler);
  }, [inputValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex items-center justify-center mt-2">
      <div className="w-full max-w-md px-4">
        <h3 className="text-center text-xl text-orange-400 mb-4">
          Welcome to the Mystic Quest!
        </h3>
        <h3 className="text-center text-lg text-stone-400 mb-4">
          Please enter your search term.
        </h3>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Search for a card..."
          className="w-full text-stone-300 border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:border-grey-200 bg-transparent"
        />
      </div>
    </div>
  );
};

export default SearchBar;
