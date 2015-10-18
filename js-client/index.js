/*// don' work in ie9 
//Object.freeze
//Object.create
require('es5-shim');*/
var React = require('react');
var App = require('./app');

React.render(
  <App />,
  document.getElementById('container')
);
