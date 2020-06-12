import React from 'react';
import firebase from 'firebase';

export default class AddBus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      busNumber: ''
    }
    this.handleBusNumberChange = this.handleBusNumberChange.bind(this)
    this.fetchTestDatas = this.fetchTestDatas.bind(this)
  }

  fetchTestDatas = () => {
    fetch('/api/v1/routes/1_102615/stops')
      .then(res => res.json())
      .then((response) => { console.log("stops for route 1_102615", response); })
      .catch((error) => { console.log("Error while fetching test datas", error); })
  }

  handleFormSubmit(e) {
    e.preventDefault();
  }

  handleBusNumberChange(e) {
    console.log(e.target.value)
    this.fetchTestDatas();
  }

  render() {
    console.log('add bus', firebase.auth().currentUser, firebase.auth().currentUser.uid);
    const { uid } = firebase.auth().currentUser;
    return (
      <form
        className={'add-bus-form'}
        onSubmit={this.handleFormSubmit}
        method={'post'}>
          <label htmlFor={'bus-number'}>Bus Number:</label>
          <input
            type={'text'}
            id={'bus-number'}
            name={'bus-number'}
            value={this.state.busNumber}
            required={true}
            onChange={this.handleBusNumberChange}
          >
          </input>
      </form>
    )
  }
}
