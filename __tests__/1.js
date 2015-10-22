//jest.dontMock('../js-client/constants');
jest.dontMock('../js-client/store');
jest.dontMock('../js-client/actionCreator');
var store = require('../js-client/store').todos;
var actionCreator = require('../js-client/actionCreator');

describe('store operations', function() 
{ 
	var state;
	it('0 task + 1 task = 1', function() { 
		 state = store(undefined, {type:"@@INIT"});
		 expect(state.length).toBe(0);
		 state = store(state, actionCreator.addTodo('new 1'));
		 expect(state.length).toBe(1);
	 });
	it('new task is first', function() { 
		 state = store(state, actionCreator.addTodo('new 2'));
		 expect(state[0].text).toBe('new 2');
	 });
	it('2 tasks + 2 tasks = 4', function() { 
		 state = store(state, actionCreator.addTodo('new 3'));
		 state = store(state, actionCreator.addTodo('new 4'));
		 expect(state.length).toBe(4);
	 });
	it('move task up', function() { 
		 state = store(state, actionCreator.moveTodoUp(1));
		 expect(state[1].text).toBe('new 4');
		 expect(state[0].text).toBe('new 3');
		 expect(state[2].text).toBe('new 2');
	 });
	it('move task down', function() { 
		 state = store(state, actionCreator.moveTodoDown(2));
		 expect(state[2].text).toBe('new 1');
		 expect(state[3].text).toBe('new 2');
		 expect(state[1].text).toBe('new 4');
	 });
	it('delete task num 0', function() { 
		 state = store(state, actionCreator.deleteTodo(0));
		 expect(state.length).toBe(3);
		 expect(state.map(function(el, i){return el.text})).toEqual(['new 4','new 1','new 2']);
	 });
	it('delete all', function() { 
		 state = store(state, actionCreator.deleteAllTodos());
		 expect(state.length).toBe(0);
	 });
 });