import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as style from "./style";
import { getUserInfo, logoutUser, getUsers } from "../../redux";
import Layout from "../../components/Layout";
import User from "../../components/User";
import UsersList from "../../components/UsersList";

const Home = (props) => {
	useEffect(() => {
	
		props.getUsers();
		if (props.loggedIn && Object.keys(props.data).length===0	) props.getUserInfo(props.token);
	}, [props.loggedIn, props.likedUsers]);
	return (
		<Layout>
			<style.FlexRow>
				{props.loggedIn && <User {...props.data} />}
				{props.users && (
					<UsersList
						users={props.users}
						loggedIn={props.loggedIn}
						likedUsers={props.likedUsers}
						id={props.data.id}
						token={props.token}
					/>
				)}
			</style.FlexRow>
		</Layout>
	);
};

const mapStateToProps = (state) => {
	return {
		token: state.user.token,
		error: state.user.error,
		data: state.user.data,
		loggedIn: state.user.loggedIn,
		users: state.users.data,
		likedUsers: state.user.data.liked_users
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getUserInfo: (token) => dispatch(getUserInfo(token)),
		logoutUser: () => dispatch(logoutUser()),
		getUsers: () => dispatch(getUsers()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
