import React from 'react';
import * as MaterialDesign from 'react-icons/md';

export default class Todo extends React.Component {
	state = {
		iconComponentName: '',
	}

	deleteTodo = () => {
		if (!window.confirm('Are you sure you want to delete this todo?')) {
			return;
		}

		fetch(`http://localhost:8082/todos/${this.props.item.id}`, { method: 'DELETE' })
			.then(response => response.json())
			.then((response) => {
				this.props.onTodoDeleted();
			});
	}

	render() {
		return (
			<tr>
				<td>{this.props.item.icon ? React.createElement(MaterialDesign[this.props.item.icon]) : ''}</td>
				<td>{this.props.item.title}</td>
				<td>{this.props.item.description}</td>
				<td>
					{this.props.item.state === 'done' ? 'Done' : this.props.item.state === 'inProgress' ? 'In progress' : 'To do'}
				</td>
				<td>
					<button onClick={() => this.props.onEditButtonClicked(this.props.item.id)}>Edit</button>
					<button onClick={this.deleteTodo}>x</button>
				</td>
			</tr>
		);
	}
}
