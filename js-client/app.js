var React = require('react');
var redux = require('redux');
var createRedux = redux.createRedux;
var reduxReact = require('redux/react');
var Provider = reduxReact.Provider;
var store = require('./store');
var bindActionCreators = redux.bindActionCreators;
var Connector = reduxReact.Connector;
var views = require('./views');
var ListView = views.ListView;
var AddNewTaskView = views.AddNewTaskView;
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

var redux = createRedux(store);

var App = React.createClass({
  render: function() {
    return (
      <Provider redux={redux}>
        {function() { return <TodoApp />; }}
      </Provider>
    );
  }
});

module.exports = App;
