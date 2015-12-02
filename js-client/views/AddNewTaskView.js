var React = require('react');

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

module.exports = AddNewTaskView;