import React from 'react';

export default class EditTodoForm extends React.Component {
	state = {
		icon: '',
		title: '',
		description: '',
		state: '',
	};

	componentDidMount() {
		fetch(`http://localhost:8082/todos/${this.props.id}`)
			.then(response => response.json())
			.then((response) => {
				this.setState({
					icon: response.data.icon,
					title: response.data.title,
					description: response.data.description,
					state: response.data.state
				});
			});
	}

	editTodo = (event) => {
		event.preventDefault();

		if (!this.state.title) {
			window.alert('Your new todo needs at least a title!');
			return;
		}

		fetch(`http://localhost:8082/todos/${this.props.id}`, {
			method: 'PATCH',
			body: JSON.stringify({
				title: this.state.title,
				description: this.state.description,
				state: this.state.state,
				icon: this.state.icon,
			}),
		}).then(response => response.json())
			.then(() => {
				this.props.onTodoEdited();
			});
	};

	handleInputChanged = (event) => {
		this.setState({ [event.target.id]: event.target.value });
	}

	render() {
		return (
			<form className={'edit-todo-form'} onSubmit={this.editTodo}>
				<div>
					<button type="button" className={'close-button'} onClick={this.props.onCloseButtonClicked}>x</button>
					<div>Update your todo</div>
				</div>
				<input type="text" id="title" placeholder={'Title'} value={this.state.title} onChange={this.handleInputChanged}/>
				<input type="text" id="description" placeholder={'Description'} value={this.state.description} onChange={this.handleInputChanged}/>
				<select id="state" placeholder={'State'}  value={this.state.state} onChange={this.handleInputChanged}>
					<option value="todo">To do</option>
					<option value="inProgress">In progress</option>
					<option value="done">Done</option>
				</select>
				<select name="icon" id="icon" value={this.state.icon} onChange={this.handleInputChanged}>
					<option value="">Type of todo</option>
					<option value="MdSchool">School</option>
					<option value="MdWork">Work</option>
					<option value="MdCake">Party</option>
					<option value="MdGroup">Friends</option>
					<option value="MdBeachAccess">Free-time</option>
				</select>
				<button type="submit" onClick={this.editTodo}>Edit</button>
			</form>
		);
	}
}
