import React from 'react';
import { TextEncoder } from 'node:util'
global.TextEncoder = TextEncoder

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, describe, it } from "@jest/globals";
import { Home } from '.';

const postHandlers = [
  http.get("*jsonplaceholder.typicode.com*", () => {
    console.log('mocked is Active!');
    return HttpResponse.json([
      {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        "url": "img1.jpg"
      },
      {
        "userId": 1,
        "id": 2,
        "title": "qui est esse",
        "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
        "url": "img2.jpg"
      },
      {
        "userId": 1,
        "id": 3,
        "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
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


    await waitForElementToBeRemoved(() => screen.queryByText('Não existem posts'));
    screen.debug();
  });
});
