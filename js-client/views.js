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
		var self = this;
		if(this.props.num !== 0)
			var moveUp = true;
		if(this.props.num !== this.props.length - 1)
			var moveDown = true;
		//var upClass =  
        return <li className={(this.props.num % 2 === 0)?"odd": ""}>
			<span className='num'>{this.props.num + "."}</span>
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
				{this.props.todos.map(function(el, i){
					return <ListItemView num={i} name={el} actions={self.props.actions} length={self.props.todos.length}>el.text</ListItemView>
				})}
			</ol>
			<span>All: {this.props.todos.length}</span>
            <button onClick={this.deleteAllTasks}>delete all</button> 
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
        	<input placeholder='add new task here...' value=
        		{this.state.taskName} onChange={this.changeTaskName} onKeyPress={this.onKeyPress}/>
            <button onClick={this.addNewTask}>add new task</button> 
        </div>;
    }
});

module.exports.ListView = ListView;
module.exports.AddNewTaskView = AddNewTaskView;

