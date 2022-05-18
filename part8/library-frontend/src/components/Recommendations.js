import { useQuery } from '@apollo/client';
import React from 'react';
import { ALL_BOOKS, CURRENT_USER } from '../Queries';

const Recommendations = (props) => {
  const booksResult = useQuery(ALL_BOOKS);
  const meResult = useQuery(CURRENT_USER);

  if (!props.show) {
    return null;
  }

  if (booksResult.loading || meResult.loading) {
    return <p>Loading books...</p>;
  }

  const books = booksResult.data.allBooks;
  const favoriteGenre = meResult.data.me.favoriteGenre;

  const renderBooks = () => {
    return books
      .filter((book) => book.genres.includes(favoriteGenre))
      .map((a) => (
        <tr key={a.title}>
          <td>{a.title}</td>
          <td>{a.author.name}</td>
          <td>{a.published}</td>
        </tr>
      ));
  };

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        Books in your favorite genre: <strong>'{favoriteGenre}'</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {renderBooks()}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
