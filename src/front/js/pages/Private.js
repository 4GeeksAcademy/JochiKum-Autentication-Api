import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Private = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()
	const [userData, setUserData] = useState(null)

	useEffect(() => {
		const token = localStorage.getItem("token")
		console.log(token);
		
		if (!token){
			navigate("/login")
			return
		}
		fetch(process.env.BACKEND_URL + "/private", {
			method: "GET",
			headers: {
				"Authorization": "Bearer " + token,
				"Content-Type": "application/json"
			}
		}).then((Response) => {
			if (!Response.ok) {
				// Take the user off this page and take them to login
				navigate("/login")
				console.error("unauthorized")
				return;
			}
			return Response.json()
		}).then((Result) => {
			// do nothing
			setUserData(Result.user)
		})
	},[navigate])

	return (
		<div>
			<h1>Private</h1>
			{userData ? <p>Welcome, {userData.username}</p> : <p>Loading...</p>}
		</div>
	)
}
