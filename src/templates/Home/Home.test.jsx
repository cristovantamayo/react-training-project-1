import React from 'react';
import { TextEncoder } from 'node:util'
global.TextEncoder = TextEncoder

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from "@jest/globals";
import { Home } from '.';
import userEvent from '@testing-library/user-event';

const postHandlers = [
  http.get("*jsonplaceholder.typicode.com*", () => {
    console.log('mocked is Active!');
    return HttpResponse.json([
      {
        "userId": 1,
        "id": 1,
        "title": "title1",
        "body": "body1",
        "url": "img1.jpg"
      },
      {
        "userId": 1,
        "id": 2,
        "title": "title2",
        "body": "body2",
        "url": "img2.jpg"
      },
      {
        "userId": 1,
        "id": 3,
        "title": "title3",
        "body": "body3",
        "url": "img3.jpg"
      },
    ])
  }),
];

const server = setupServer(...postHandlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.restoreHandlers());

  afterAll(() => {
    server.close();
  });

  it('should render search, posts and load more', async () => {
    render(<Home />);

    expect.assertions(3);

    await waitForElementToBeRemoved(() => screen.queryByText('Não existem posts'));

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img', { name: /title/i });
    expect(images).toHaveLength(2);

    const button = screen.getByRole('button', { name: /Load more posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should search for posts', async () => {
    render(<Home />);

    expect.assertions(10);

    const search = screen.getByPlaceholderText(/type your search/i);
    await waitForElementToBeRemoved(() => screen.queryByText('Não existem posts'));

    expect(screen.getByRole('heading', { name: 'title1 1' }))
      .toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2 2' }))
      .toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title3 3' }))
      .not.toBeInTheDocument();

    await userEvent.type(search, 'title1');

    expect(screen.getByRole('heading', { name: 'title1 1' }))
      .toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title2 2' }))
      .not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title3 3' }))
      .not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Search Value: title1' }))
      .toBeInTheDocument();

    await userEvent.clear(search);

    expect(screen.getByRole('heading', { name: 'title1 1' }))
      .toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2 2' }))
      .toBeInTheDocument();

    await userEvent.type(search, 'post does not exists');

    expect(screen.queryByText('Não existem posts'))
      .toBeInTheDocument();
  });
});



