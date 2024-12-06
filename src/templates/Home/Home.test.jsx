import React from 'react';
import { TextEncoder } from 'node:util'
global.TextEncoder = TextEncoder

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from "@jest/globals";
import { Home } from '.';

const postHandlers = [
  http.get("*jsonplaceholder.typicode.com*", () => {
    console.log('mocked is Active!');
    return HttpResponse.json([
      {
        "userId": 1,
        "id": 1,
        "title": "title 1",
        "body": "body 1",
        "url": "img1.jpg"
      },
      {
        "userId": 1,
        "id": 2,
        "title": "title 2",
        "body": "body 2",
        "url": "img2.jpg"
      },
      {
        "userId": 1,
        "id": 3,
        "title": "title 3",
        "body": "body 3",
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
    expect(images).toHaveLength(3);

    const button = screen.getByRole('button', { name: /Load more posts/i });
    expect(button).toBeInTheDocument();
  });
});
