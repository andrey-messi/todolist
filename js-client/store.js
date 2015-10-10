var actionTypes = require('./constants').actionTypes;

var initialState = [];

var exchangeElements = function(state, num, secondNum){
	if(secondNum >= state.length || secondNum < 0)
	//	return state;
		return state.concat([]);
	return state.map(function(el, i) {
	  if(i === num)
		return state[secondNum];			
	  else if(i === secondNum)
		return state[num];
	  else
		return el;
	})
};

module.exports.todos = function(state, action) {
  state = state || initialState;
  switch (action.type) {
	  case actionTypes.ADD_TODO:
		return [{
		  text: action.text
		}].concat(state);
	  case actionTypes.DELETE_TODO:
		return state.filter(function(el, i) {
		  return i !== action.num
		});
	  case actionTypes.MOVE_TODO_UP:
		return exchangeElements(state, action.num, action.num - 1);
	  case actionTypes.MOVE_TODO_DOWN:
		return exchangeElements(state, action.num, action.num + 1);
	  case actionTypes.DELETE_ALL_TODOS:
	//	return initialState;
		return [];
	  default:
		return state;
  }
}
