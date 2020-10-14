const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json({ type: ['application/json', 'text/plain'] }));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

let data = require('../todos.json');
let todos = data.todos;
let index = data.index;

app.get('/todos',(req, res) => {
	return res.send({ data: todos });
});

app.get('/todos/:id',(req, res) => {
	const integerId = parseInt(req.params.id);
	const todo = todos.find((item) => item.id === integerId);

	return res.send({ data: todo });
});

app.post('/todos',(req, res) => {
	index += 1;

	const newTodo = { ...req.body, ...{ id: index } };
	todos.push(newTodo);

	let writeError;
	data = fs.writeFileSync('../todos.json', JSON.stringify({ todos, index }), (err) => {
		if (err) {
			writeError = err;
		}
	});

	if (writeError) {
		return res.send({ data: writeError });
	}

	return res.send({ data: newTodo });
});

app.patch('/todos/:id',(req, res) => {
	const integerId = parseInt(req.params.id);

	todos.map((item) => {
		if (item.id === integerId) {
			item.title = req.body.title;
			item.description = req.body.description;
			item.state = req.body.state;
			item.icon = req.body.icon;
		}
	});

	let writeError;
	data = fs.writeFileSync('../todos.json', JSON.stringify({ todos, index }), err => {
		if (err) {
			writeError = err;
		}
	});

	if (writeError) {
		return res.send({ data: writeError });
	}

	return res.send({ data: { updatedTodo: req.body.id } });
});

app.delete('/todos/:id',(req, res) => {
	const integerId = parseInt(req.params.id);

	todos.map((item) => {
		if (integerId === item.id) {
			todos.splice(todos.indexOf(item), 1);
		}
	});

	let writeError;
	data = fs.writeFileSync('../todos.json', JSON.stringify({ todos, index }), err => {
		if (err) {
			writeError = err;
		}
	});

	if (writeError) {
		return res.send({ data: writeError });
	}

	return res.send({ data: { deletedItem: req.params.id } });
});

const port = 8082;

app.listen(port, (error) => {
	if (error) {
		console.log('Error: ' + error);
	}

	console.log('Server is running on port: ' + port);
});
