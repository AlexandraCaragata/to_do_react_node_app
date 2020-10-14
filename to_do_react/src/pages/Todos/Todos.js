import React from "react";
import './Todos.scss';
import Todo from "../../components/Todos/Todo";
import AddNewTodoForm from "../../components/Todos/AddNewTodoForm";
import EditTodoForm from "../../components/Todos/EditTodoForm";

export default class Todos extends React.Component {
	state = {
		todo: [],
		inProgress: [],
		done: [],
		showNewTodoForm: false,
		showUpdateTodoForm: false,
		idToBeEdited: '',
	};

	componentDidMount() {
		this.updateTodoList();
	};

	updateTodoList = () => {
		fetch('http://localhost:8082/todos')
			.then(response => response.json())
			.then((response) => {
				this.setState({
					todo: response.data.filter((item) => item.state === 'todo'),
					inProgress: response.data.filter((item) => item.state === 'inProgress'),
					done: response.data.filter((item) => item.state === 'done')
				});
			});
	};

	addedNewTodo = () => {
		this.updateTodoList();
		this.setState({ showNewTodoForm: false });
	};

	updateTodo = () => {
		this.updateTodoList();
		this.setState({ showUpdateTodoForm: false });
	};

	handleEditButtonClick = (id) => {
		this.setState({
			idToBeEdited: id,
			showUpdateTodoForm: true,
		});
	}

	render() {
		return (
			<div>
				{this.state.showNewTodoForm ?
					<AddNewTodoForm
						onTodoAdded={this.addedNewTodo}
						onCloseButtonClicked={() => this.setState({ showNewTodoForm: false })}/> : ''
				}
				{this.state.showUpdateTodoForm ?
					<EditTodoForm
						onTodoEdited={this.updateTodo}
						id={this.state.idToBeEdited}
						onCloseButtonClicked={() => this.setState({ showUpdateTodoForm: false })}/> : ''
				}
				<div className={`Todos ${ this.state.showNewTodoForm ? 'inTheBack': '' }`}>
					<h1>Time to manage some tasks!</h1>

					<div className="todos-list">
						<table>
							<thead>
								<tr>
									<th className={'icon'}/>
									<th className={'name'}>Name</th>
									<th className={'description'}>Description</th>
									<th className={'state'}>State</th>
									<th className={'buttons'}>
										<button className="button add-todo" onClick={() => this.setState({showNewTodoForm: true})}>
											New todo
										</button>
									</th>
								</tr>
							</thead>
							<tbody>
								{ this.state.todo.map((item) =>
										<Todo
											item={item}
											key={item.id}
											onTodoDeleted={this.updateTodoList}
											onEditButtonClicked={(id) => this.handleEditButtonClick(id)}
										/>)
								}
								{ this.state.inProgress.map((item) =>
										<Todo
											item={item}
											key={item.id}
											onTodoDeleted={this.updateTodoList}
											onEditButtonClicked={(id) => this.handleEditButtonClick(id)}
										/>)
								}
								{ this.state.done.map((item) =>
										<Todo
											item={item}
											key={item.id}
											onTodoDeleted={this.updateTodoList}
											onEditButtonClicked={(id) => this.handleEditButtonClick(id)}
										/>)
								}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}
