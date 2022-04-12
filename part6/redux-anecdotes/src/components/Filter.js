import { connect } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = (props) => {
  const handleFilterChange = (event) => {
    props.setFilter(event.target.value);
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

const mapDispatchToProps = {
  setFilter,
};

export default connect(null, mapDispatchToProps)(Filter);
