import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../Queries';

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <p>Loading books...</p>;
  }

  const books = result.data.allBooks;

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
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
