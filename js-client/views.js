var React = require('react');

var ListItemView = React.createClass({
	remove: function() {
    	this.props.actions.deleteTodo(this.props.num);
    },
	moveUp: function() {
    	this.props.actions.moveTodoUp(this.props.num);
    },
	moveDown: function() {
    	this.props.actions.moveTodoDown(this.props.num);
    },
    render: function() {
		if(this.props.length === 0)
			return <li id='no-tasks'>
				<span className='text'>you have no tasks</span>
			</li>;
		var self = this;
		if(this.props.num !== 0)
			var moveUp = true;
		if(this.props.num !== this.props.length - 1)
			var moveDown = true;
        return <li className={(this.props.num % 2 === 0)?"odd": ""}>
			<span className='num'>{this.props.num + 1 + "."}</span>
			<span className='text'>{this.props.name}</span>
			<div onClick={this.remove} className='delete fa fa-times fa-2x'>
			</div>
			<div className='movers'>
				<div onClick={function(){if(moveUp)self.moveUp();}} className={"up fa fa-chevron-up" + ((!moveUp)?" disabled": "")}></div>
				<div onClick={function(){if(moveDown)self.moveDown();}} className={"down fa fa-chevron-down" + ((!moveDown)?" disabled": "")}></div>
			</div>
		</li>;
    }
});

var ListView = React.createClass({
	deleteAllTasks: function() {
		this.props.actions.deleteAllTodos();
    },
    render: function() {
		var self = this;
        return <div>
			<ol>
				{(this.props.todos.length > 0)?
					this.props.todos.map(function(el, i){
						return <ListItemView num={i} name={el.text} actions={self.props.actions} length={self.props.todos.length}></ListItemView>
					}) : <ListItemView length={0}></ListItemView>
				}
			</ol>		
			<span className='summary-span' id="summary">All: {/* react автоматом добавит сюда еще 1 span (???)*/this.props.todos.length}</span>
            <button className='delete-all' tabIndex='3' onClick={this.deleteAllTasks}>delete all</button> 
		</div>;
    }
});

var AddNewTaskView = React.createClass({
	getInitialState: function() {
    	return {taskName: ''};
    },
	changeTaskName: function(e) {
		// ВЫЗОВЕТ ЛИШНЮЮ ПЕРЕРИСОВКУ ИНПУТА!!
    	this.setState({taskName: e.currentTarget.value});
    },
	addNewTask: function(e) {
		if(this.state.taskName.match(/^\s*$/i))
			alert('error! empty task name')
		else{
			this.props.onAddNewTask(this.state.taskName.trim());
			this.setState({taskName: ''});
		}
    },
	onKeyPress: function(e) {
		if (e.which == 13) 
			this.addNewTask();
    },
    render: function() {
        return <div>
            <button tabIndex='2' onClick={this.addNewTask}>add new task</button> 
        	<div id="input-div">
				<input tabIndex='1' placeholder='add new task here...' value=
        		{this.state.taskName} onChange={this.changeTaskName} onKeyPress={this.onKeyPress}/>
			</div>
        </div>;
    }
});

module.exports.ListView = ListView;
module.exports.AddNewTaskView = AddNewTaskView;

