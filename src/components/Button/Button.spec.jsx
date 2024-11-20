import { fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Button } from ".";

describe('<Button />', () => {
  it('it should render a button with text', () => {
    render(<Button text="Load more posts" />);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should call function on button click', () => {
    const fn = jest.fn();
    render(<Button text="Load more posts" onClick={fn} />);

    const button = screen.getByRole('button', { name: /load more posts/i });
    
    fireEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(1);

  });

  it('should de disabled if disabled true', () => {
    render(<Button text="Load more posts" disabled={true} />);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeDisabled();

  });
});