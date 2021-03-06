import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../Queries';
import BirthYearForm from './BirthYearForm';

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  if (!props.show) {
    return null;
  }
  if (result.loading) {
    return <p>Loading authors...</p>;
  }

  if (!result.data.allAuthors.length) {
    return <p>No authors in the database</p>;
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <BirthYearForm authors={authors} />
    </div>
  );
};

export default Authors;
