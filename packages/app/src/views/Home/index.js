import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserInfo, logoutUser } from "../../redux";
import Layout from "../../components/Layout";
import User from "../../components/User";


const Home = (props) => {
	useEffect(() => {
		if(props.loggedIn) props.getUserInfo(props.token);
	}, [props.loggedIn]);
	return (
		<Layout>
			
			{props.loggedIn && <User {...props.data}/>}
{/* 			<button onClick={props.logoutUser}>Logout</button> */}
		</Layout>
	);
};

const mapStateToProps = (state) => {
	return {
		token: state.user.token,
		error: state.user.error,
		data: state.user.data,
		loggedIn: state.user.loggedIn
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getUserInfo: (token) => dispatch(getUserInfo(token)),
		logoutUser: () => dispatch(logoutUser()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
