var React = require('react');
var ListItemView = require('./ListItemView');

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

module.exports = ListView;