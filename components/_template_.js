const h = require('react-hyperscript');

import React from 'react';

class TemplateComponent extends React.Component {
  render() {
    return (

      h('.index', [
        h('.notice', 'wadup'),
      ])

    );
  }
}

TemplateComponent.defaultProps = {
};

export default TemplateComponent;
