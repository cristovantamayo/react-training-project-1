import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from '@jest/globals'
import { PostCard } from ".";
import { postCardPropsMock } from "../MockUtil/mock";

const props = postCardPropsMock;

describe('<PostCard />', () => {
  it('should render PostCard', () => {
    render(<PostCard {...props} />);

    expect(screen.getByAltText(/title 1/i))
            .toHaveAttribute('src', 'img/img.png');
    expect(screen.getByRole('heading', { name: /title 1/i}))
            .toBeInTheDocument();
    expect(screen.getByText('body 1')).toBeInTheDocument();
  });
  it('should match snapshot', () => {
    const { container } = render(<PostCard {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
