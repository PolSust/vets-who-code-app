import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import './form.css'

function Form({ formData }) {
  const { register, handleSubmit } = useForm()
  return (
    <form
      onSubmit={handleSubmit(submit => formData(submit, 1))}
      className="form-inline text-center"
    >
      <div className="zipcode-container">
        <label className="sr-only" htmlFor="zipCode">
          Zip Code
        </label>
        <input
          type="string"
          pattern="[0-9]{5}"
          className="form-control input-md"
          id="zipCode"
          placeholder="Zip Code"
          required
          name="zipCode"
          ref={register}
        />
      </div>
      <div className="remote-container">
        <input
          className="form-check-input"
          type="checkbox"
          id="inlineFormCheck"
          name="remote"
          ref={register}
        />
        <label className="form-check-label" htmlFor="inlineFormCheck" style={{ marginLeft: 5 }}>
          Remote Only
        </label>
      </div>

      <div className="form-group distance-container">
        <label htmlFor="distanceSelect"></label>
        <select
          className="form-control input-md"
          id="distanceSelect"
          defaultValue="40"
          name="distance"
          ref={register}
        >
          {/* <!-- value is set in km --> */}
          <option value="1">Only in</option>
          <option value="8">5 mi.</option>
          <option value="16">10 mi.</option>
          <option value="24">15 mi.</option>
          <option value="40">25 mi.</option>
          <option value="80">50 mi.</option>
          <option value="161">100 mi.</option>
          <option value="322">200 mi.</option>
          <option value="5000">CONUS</option>
        </select>
      </div>

      <div className="search-button">
        <button type="submit" className="btn btn-charity-default">
          <i className="glyphicon glyphicon-search">&nbsp;Search</i>
        </button>
      </div>
    </form>
  )
}

export default Form

Form.propTypes = {
  formData: PropTypes.func,
}
