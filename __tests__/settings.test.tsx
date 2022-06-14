import { render, screen } from '@testing-library/react';
import Settings from '../components/NavMenu/Settings';

describe('Settings', () => {
  it('checks for setting button render', () => {
    render(<Settings />);

    const button = screen.getByTestId('settings-button');

    expect(button).toBeInTheDocument();
  });
});
