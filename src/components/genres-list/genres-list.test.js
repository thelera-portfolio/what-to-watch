import React from "react";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import renderer from "react-test-renderer";
import GenresList from "./genres-list.jsx";

const mockStore = configureStore([]);

it(`GenresList is rendered correctly`, () => {
  const store = mockStore({
    genres: [`Action`, `Drama`, `Western`, `Story`],
  });

  const tree = renderer.create(
      <Provider store={store}>
        <GenresList
          onGenreCardClick={() => { }}
        />
      </Provider>, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

  expect(tree).toMatchSnapshot();
});
