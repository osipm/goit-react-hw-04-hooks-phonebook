import { PropTypes } from 'prop-types';
import s from './Filter.module.css';
function Filter({ filter, onHandleChange }) {
  return (
    <label className={s.label}>
      Find contacts by name:
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={onHandleChange}
      />
    </label>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onHandleChange: PropTypes.func.isRequired,
};

export default Filter;
