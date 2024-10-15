import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import TableButton from '../src/components/button/TableButton';

describe('TableButton', () => {
    test('renders TableButton component', () => {
        render(<TableButton icon={() => <div data-testid="mock-icon" />} iconColor="red" />);
        const buttonElement = screen.getByTestId('mock-icon');

        // for passing test
        expect(buttonElement).toBeInTheDocument();
        // for failing test
        // expect(buttonElement).not.toBeInTheDocument();
      });
  });