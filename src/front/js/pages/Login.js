import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Login = ({ setToken }) => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()
	function singup(e) {
		e.preventDefault()
		let email = e.target.email.value
		let password = e.target.password.value
		fetch(process.env.BACKEND_URL + "/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json", // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#setting_headers
			}, body: JSON.stringify({ email, password })
		}).then((Response) => {
			if (!Response.ok) {
				throw new Error('Something went wrong')
			}
			return Response.json()
		}).then((Result) => {
			alert(Result.message)
			localStorage.setItem("token", Result.token)
			setToken(Result.token)
			navigate("/private")
		})
	}

	return (
		<div className="container">
			<h1>Login</h1>
			<form onSubmit={singup}>
				<div class="mb-3">
					<label for="exampleInputEmail1" class="form-label">Email address</label>
					<input name="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
					<div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
				</div>
				<div class="mb-3">
					<label for="exampleInputPassword1" class="form-label">Password</label>
					<input name="password" type="password" class="form-control" id="exampleInputPassword1" />
				</div>
				<button type="submit" class="btn btn-primary">Login</button>
				<button class="btn btn-primary" onClick={() => navigate("/signup")} type="buttom">SignUp</button>
			</form>
		</div>
	);
};
