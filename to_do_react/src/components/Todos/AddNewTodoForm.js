import React from 'react';

export default class AddNewTodoForm extends React.Component {
	state = {
		icon: '',
		title: '',
		description: '',
		state: 'todo',
	};

	addTodo = (event) => {
		event.preventDefault();

		if (!this.state.title) {
			window.alert('Your new todo needs at least a title!');
			return;
		}

		fetch(`http://localhost:8082/todos`, {
			method: 'POST',
			body: JSON.stringify({
				title: this.state.title,
				description: this.state.description,
				state: this.state.state,
				icon: this.state.icon,
			}),
		}).then(response => response.json())
			.then((response) => {
				console.log(response);
				this.props.onTodoAdded();
			});
	};

	handleInputChanged = (event) => {
		this.setState({ [event.target.id]: event.target.value });
	}

	render() {
		return (
			<form className={'add-new-todo-form'} onSubmit={this.addTodo}>
				<div>
					<button type="button" className={'close-button'} onClick={this.props.onCloseButtonClicked}>x</button>
					<div>Add a new todo</div>
				</div>
				<input type="text" id="title" placeholder={'Title'} value={this.state.title} onChange={this.handleInputChanged}/>
				<input type="text" id="description" placeholder={'Description'} value={this.state.description} onChange={this.handleInputChanged}/>
				<select name="icon" id="icon" value={this.state.icon} onChange={this.handleInputChanged}>
					<option value="">Type of todo</option>
					<option value="MdSchool">School</option>
					<option value="MdWork">Work</option>
					<option value="MdCake">Party</option>
					<option value="MdGroup">Friends</option>
					<option value="MdBeachAccess">Free-time</option>
				</select>
				<button type="submit" onClick={this.addTodo}>Add</button>
			</form>
		);
	}
}
