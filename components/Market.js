const h = require('react-hyperscript');
const MarketStore = require('../stores/market.js');

import React from 'react';

// var store = MarketStore()
// console.log(store)

class MarketComponent extends React.Component {
  render() {
    return (

      h('.index', [
        h('.notice', 'snakes'),
      ])

    );
  }
}

export default MarketComponent;
