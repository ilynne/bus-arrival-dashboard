import React from 'react';
import PropTypes from 'prop-types';

export default class BusInput extends React.Component {
  handleBusNumberChange = (e) => {
    this.props.handleBusNumberChange(e.target.value);
  }

  render() {
    return (
      <div>
        <p>Bus</p>
        <input
          type={'text'}
          id={'bus-number'}
          name={'bus-number'}
          value={this.props.busNumber}
          required={true}
          onChange={this.handleBusNumberChange}
        >
        </input>
      </div>
    )
  }
}

BusInput.propTypes = {
  busNumber: PropTypes.string.isRequired,
  handleBusNumberChange: PropTypes.func.isRequired,
}
