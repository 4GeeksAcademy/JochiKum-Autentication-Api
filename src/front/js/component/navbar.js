import React, { useState } from "react";
import { Link } from "react-router-dom";


export const Navbar = ({ token, setToken }) => {


	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				{token && <div className="ml-auto">
					<Link to="/login" onClick={() => {
						localStorage.removeItem("token")
						setToken(null)
					}}>
						<button className="btn btn-primary">Logout</button>
					</Link>
				</div>}
			</div>
		</nav>
	);
};
