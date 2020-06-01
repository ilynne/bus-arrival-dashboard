import React from 'react';

export default class Dashboard extends React.Component {
    fetchTestDatas = function () {
      fetch('/api/v1/routes')
        .then(res => res.json())
        .then((response) => { console.log("Test datas response", response); })
        .catch((error) => { console.log("Error while fetching test datas", error); })
    }

    render() {
      return (
        <div>
          <button onClick={this.fetchTestDatas}>
            Fetch Test Datas
          </button>
        </div>
      )
    }
}
