var React = require('react');
var redux = require('redux');
var createRedux = redux.createRedux;
var reduxReact = require('redux/react');
var Provider = reduxReact.Provider;
var store = require('./store');
var TodoApp = require('./TodoApp');

var reduxStore = createRedux(store);

var App = React.createClass({
  render: function() {
    return (
      <Provider redux={reduxStore}>
        {function() { return <TodoApp />; }}
      </Provider>
    );
  }
});

module.exports = App;
