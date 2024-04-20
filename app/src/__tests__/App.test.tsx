import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from '../App';

jest.mock('axios');

describe('App component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('fetches and displays cards when search is performed', async () => {
    const mockedCards = [
      {
        name: 'Card 1',
        set_name: 'Set 1',
        cardmarket_id: '123',
        rarity: 'Rare',
        image_uris: { normal: 'image1.jpg' },
      },
      {
        name: 'Card 2',
        set_name: 'Set 2',
        cardmarket_id: '456',
        rarity: 'Common',
        image_uris: { normal: 'image2.jpg' },
      },
    ];

    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: { data: mockedCards },
    });

    const { getByPlaceholderText, getByText } = render(<App />);
    const input = getByPlaceholderText('Search for a card...');

    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(
      () => {
        expect(getByText('Card 1')).toBeTruthy();
        expect(getByText('Card 2')).toBeTruthy();
      },
      { timeout: 5000 }
    );
  });
});
