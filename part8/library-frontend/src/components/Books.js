import { useQuery, useSubscription, useApolloClient } from '@apollo/client';
import { useState } from 'react';
import { ALL_BOOKS, BOOK_ADDED } from '../Queries';
import { updateCache } from '../utils';

const Books = (props) => {
  const client = useApolloClient();
  const [selectedGenre, setSelectedGenre] = useState('all genres');

  const result = useQuery(ALL_BOOKS, {
    variables: {
      genre: selectedGenre === 'all genres' ? '' : selectedGenre,
    },
  });

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData);
      window.alert('New book was just added!');
      const addedBook = subscriptionData.data.bookAdded;
      updateCache(
        client.cache,
        {
          query: ALL_BOOKS,
        },
        addedBook
      );
      result.refetch(ALL_BOOKS, {
        variables: {
          genre: selectedGenre,
        },
      });
    },
  });

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <p>Loading books...</p>;
  }

  if (!result.data.allBooks.length) {
    return <p>No books in the database</p>;
  }

  const books = result.data.allBooks;
  const genresArr = books.reduce((prev, cur) => {
    return [...prev, ...cur.genres];
  }, []);

  // filter out duplicates and add "all genres"
  const filteredGenres = genresArr
    .filter((genre, index) => genresArr.indexOf(genre) === index)
    .concat('all genres');

  const renderGenres = () => {
    return filteredGenres.map((genre, i) => (
      <button
        key={i}
        onClick={({ target }) => genreButtonHandler(target.innerText)}
      >
        {genre}
      </button>
    ));
  };

  const genreButtonHandler = (genre) => {
    if (genre === 'all genres') {
      setSelectedGenre(null);
    }
    setSelectedGenre(genre);
  };

  const renderBooks = () => {
    return books
      .filter((book) => {
        return selectedGenre === 'all genres'
          ? true
          : book.genres.includes(selectedGenre);
      })
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
      <h2>books</h2>

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
      {renderGenres()}
    </div>
  );
};

export default Books;
