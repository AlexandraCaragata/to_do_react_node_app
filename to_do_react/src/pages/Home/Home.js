import React from "react";
import './Home.scss';
import { Link } from "react-router-dom";

export default class Home extends React.Component {
	render() {
		return (
			<div className={'Home'}>
				<h1>Welcome to your new way of managing tasks!</h1>
				<Link to="/todos" className="nav-link">
					<button>Go to list</button>
				</Link>
			</div>
		);
	}
}
