import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';

import Jobs from './components/Jobs';
import { withStyles } from '@material-ui/core/styles';

import store from './store';

const _ = require('lodash');

const styles = theme => ({
  blob: {
    width: 800,
    height: 800,
    background: '#eef1f1',
    position: 'absolute',
    top: -200,
    left: -200,
    zIndex: -1
  }
});

class App extends Component {

  generateBlobRadius = () => {
    const percentage1 = _.random(25, 75);
    const percentage2 = _.random(25, 75);
    const percentage3 = _.random(25, 75);
    const percentage4 = _.random(25, 75);
    var percentage11 = 100 - percentage1;
    var percentage21 = 100 - percentage2;
    var percentage31 = 100 - percentage3;
    var percentage41 = 100 - percentage4;
    return `${percentage1}% ${percentage11}% ${percentage21}% ${percentage2}% / ${percentage3}% ${percentage4}% ${percentage41}% ${percentage31}%`;
  }

  render() {
    const { classes } = this.props;
    return (
      <Provider store={store}>
        <div className="App">
          <div className={classes.blob} style={{ borderRadius: this.generateBlobRadius()}}></div>
          <Jobs />
        </div>
      </Provider>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
