var actionTypes = require('./constants').actionTypes;

module.exports.addTodo = function(text) {
  return {
    type: actionTypes.ADD_TODO,
    text: text
  };
}

module.exports.deleteTodo = function(num) {
  return {
    type: actionTypes.DELETE_TODO,
    num: num
  };
}
module.exports.moveTodoUp = function(num) {
  return {
    type: actionTypes.MOVE_TODO_UP,
    num: num
  };
}

module.exports.moveTodoDown = function(num) {
  return {
    type: actionTypes.MOVE_TODO_DOWN,
    num: num
  };
}

module.exports.deleteAllTodos = function() {
  return {
    type: actionTypes.DELETE_ALL_TODOS
  };
}