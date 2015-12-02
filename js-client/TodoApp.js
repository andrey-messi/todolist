var React = require('react');
var redux = require('redux');
var reduxReact = require('redux/react');
var Connector = reduxReact.Connector;
var bindActionCreators = redux.bindActionCreators;
var ListView = require('./views/ListView');
var AddNewTaskView = require('./views/AddNewTaskView');
var actionCreator = require('./actionCreator');

var TodoApp = React.createClass({
  render: function() {
    return (
    //  <Connector select={function(store) { return {todos: store.todos} }}>
    //  <Connector select={function(store) { return store }}>
      <Connector>
        {this.renderViews}
      </Connector>
    );
  },

  renderViews: function(store) {
    var actions = bindActionCreators(actionCreator, store.dispatch);
    return (
	  <div>
		<AddNewTaskView onAddNewTask={actions.addTodo}></AddNewTaskView>
		<ListView todos={store.todos} actions={actions} />
      </div>
    );
  }
});

module.exports = TodoApp;