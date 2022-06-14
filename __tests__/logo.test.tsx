import { render, screen, within } from '@testing-library/react';
import Logo from 'components/NavMenu/Logo';

describe('Logo', () => {
  it('is the logo rendering', () => {
    render(<Logo />);

    const header = screen.getByRole('heading');
    const logo = within(header).getByRole('link');

    expect(logo).toHaveTextContent('OfficialBio');
  });
});
