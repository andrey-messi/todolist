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

module.exports = ListItemView;