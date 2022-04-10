import { useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <label style={style}>
      Filter:
      <input onChange={handleFilterChange} name='filter' />
    </label>
  );
};

export default Filter;
