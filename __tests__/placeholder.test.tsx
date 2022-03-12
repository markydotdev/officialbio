import React from 'react';
import { render, screen } from '@testing-library/react';
import Placeholder from '../components/Placeholder';

describe('Placeholder', () => {
  it('renders a placeholder', () => {
    render(
      <Placeholder height={undefined} margin={undefined} width={undefined} />
    );

    const placeholder = screen.getByTestId('placeholder');

    expect(placeholder).toBeInTheDocument();
  });
});
