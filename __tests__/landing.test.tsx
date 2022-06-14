import { render, screen } from '@testing-library/react';
import Landing from '../components/Landing';

describe('Home Page', () => {
  it('renders the home page', () => {
    render(<Landing />);

    const hero = screen.getByRole('heading', {
      level: 2,
      name: /your corner of the web/i,
    });

    expect(hero).toBeInTheDocument();
  });
});
