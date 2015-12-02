var React = require('react');
//итак не мокаются jest.dontMock('react-addons-test-utils');
var testUtils = require('react-addons-test-utils');
jest.dontMock('../js-client/views/ListItemView');
jest.dontMock('../js-client/views/AddNewTaskView');
jest.dontMock('../js-client/views/ListView');
var AddNewTaskView = require('../js-client/views/AddNewTaskView');
var ListView = require('../js-client/views/ListView');
jest.dontMock('../js-client/store');
var store = require('../js-client/store').todos;
jest.dontMock('../js-client/actionCreator');
var actionCreator = require('../js-client/actionCreator');

describe('AddNewTaskView', function(){
	var addTodo = jest.genMockFunction();
	var addNewTaskView = testUtils.renderIntoDocument(
		<AddNewTaskView onAddNewTask={addTodo}></AddNewTaskView>
	);
	var input = testUtils.findRenderedDOMComponentWithTag(addNewTaskView, 'input').getDOMNode();
	it('should be entered', function(){
		expect(addTodo).not.toBeCalled();
		
	/*	var ren = testUtils.createRenderer();
		ren.render(AddNewTaskView);
		var input = ren.getRenderOutput();*/
		
	//	expect(testUtils.isCompositeComponent(input)).toBe(true);
	//	expect(input.value).toBe(true);
		input.value = 'task 1';
		testUtils.Simulate.change(input);
		testUtils.Simulate.keyPress(input, {which: 13});
		//expect(addTodo).toBeCalled();
		expect(addTodo.mock.calls.length).toBe(1);
	});
	it('empty task should not be clicked', function(){		
		input.value = '';
		testUtils.Simulate.change(input);
		var button = testUtils.findRenderedDOMComponentWithTag(addNewTaskView, 'button').getDOMNode();
		testUtils.Simulate.click(button);
		expect(addTodo.mock.calls.length).toBe(1);
	});
	it('should be clicked', function(){
		input.value = 'task 2';
		testUtils.Simulate.change(input);
		var button = testUtils.findRenderedDOMComponentWithTag(addNewTaskView, 'button').getDOMNode();
		testUtils.Simulate.click(button);
		expect(addTodo.mock.calls.length).toBe(2);
	});
});

describe('ListView', function(){
	var deleteAllTodos = jest.genMockFunction();
	var state = store(undefined, {type:"@@INIT"});
	state = store(state, actionCreator.addTodo('new 1'));
	state = store(state, actionCreator.addTodo('new 2'));
	actionCreator.deleteAllTodos = deleteAllTodos;
	var listView = testUtils.renderIntoDocument(
		<ListView todos={state} actions={actionCreator}></ListView>
	);
	it('should show ALL:2 ', function(){
		var span = testUtils.findRenderedDOMComponentWithClass(listView, 'summary-span').getDOMNode();
		expect(span.getElementsByTagName('span')[1].innerHTML).toBe('2');
	});
	it('DELETE ALL should be clicked', function(){
		expect(deleteAllTodos).not.toBeCalled();
		var button = testUtils.findRenderedDOMComponentWithClass(listView, 'delete-all').getDOMNode();
		testUtils.Simulate.click(button);
		//expect(deleteAllTodos).toBeCalled();
		expect(deleteAllTodos.mock.calls.length).toBe(1);
	});
});