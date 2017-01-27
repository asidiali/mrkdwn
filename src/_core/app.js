import React, {PropTypes} from 'react';

import {StyleRoot} from 'radium';
import styles from './styles';

class App extends React.Component {
  render() {
    return (
      <StyleRoot>
        <div style={styles.base}>
          {this.props.children}
        </div>
      </StyleRoot>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};

export default App;
