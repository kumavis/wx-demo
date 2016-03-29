const h = require('react-hyperscript');
import Market from './Market'

import React from 'react';

class MainComponent extends React.Component {
  render() {
    return (

      h('.index', [
        h('.title', 'this is the app:'),
        h(Market),
      ])

    );
  }
}

MainComponent.defaultProps = {
};

export default MainComponent;
