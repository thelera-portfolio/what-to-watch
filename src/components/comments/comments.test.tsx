import * as React from "react";
import * as renderer from "react-test-renderer";
import {Comment} from "../../types";
import Comments from "./comments";
import {BrowserRouter} from "react-router-dom";

const comments: Array<Comment> = [
  {
    comment: `This movie is just plain bad. There must be some big payola going round this awards season. Badly written, average acting at best, all the characters are unrelatable and inlikeable. 2 hours of my life wasted.`,
    date: `2019-05-08T14:13:56.569Z`,
    id: 7,
    rating: 11,
    user: {
      id: 11.7,
      name: `Pete`,
    }
  },
  {
    comment: `This movie is just plain bad. There must be some big payola going round this awards season. Badly written, average acting at best, all the characters are unrelatable and inlikeable. 2 hours of my life wasted.`,
    date: `2019-05-08T14:13:56.569Z`,
    id: 74,
    rating: 1,
    user: {
      id: 2,
      name: `Ann`,
    }
  },
  {
    comment: `This movie is just plain bad. There must be some big payola going round this awards season. Badly written, average acting at best, all the characters are unrelatable and inlikeable. 2 hours of my life wasted.`,
    date: `2019-05-08T14:13:56.569Z`,
    id: 0,
    rating: 131,
    user: {
      id: 7,
      name: `George`,
    }
  },
];

it(`Comments is rendered correctly`, () => {
  const tree = renderer.create(
      <BrowserRouter>
        <Comments
          comments={comments}
        />
      </BrowserRouter>, {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
