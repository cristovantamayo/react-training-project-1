import React from 'react';
import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from ".";
import { jest } from '@jest/globals'

describe('<Button />', () => {
    it('it should render a button with text', () => {
      const fn = jest.fn();
      render(<Button text="Load more posts" disabled={true} onClick={fn} />);

      const button = screen.getByRole('button', { name: /load more posts/i });
      expect(button).toBeInTheDocument();
    });

    it('should call function on button click', async () => {
      const fn = jest.fn();
      render(<Button text="Load more posts" onClick={fn} />);

      const button = screen.getByRole('button', { name: /load more posts/i });
      await fireEvent.click(button);

      expect(fn).toHaveBeenCalledTimes(1);

    });

    it('should de disabled if disabled true', () => {
      const fn = jest.fn();
      render(<Button text="Load more posts" disabled={true} onClick={fn} />);

      const button = screen.getByRole('button', { name: /load more posts/i });
      expect(button).toBeDisabled();

    });

    it('should de disabled if disabled true', () => {
      const fn = jest.fn();
      render(<Button text="Load more posts" disabled={false} onClick={fn} />);

      const button = screen.getByRole('button', { name: /load more posts/i });
      expect(button).toBeEnabled();

    });

    it('should match snapshot', () => {
      const fn = jest.fn();
      const { container } = render(<Button text="Load more posts" disabled={false} onClick={fn} />);
      expect(container.firstChild).toMatchSnapshot();
    });
});
