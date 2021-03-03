import React, { useState } from "react";
import { Form } from "antd";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import {
	StyledWrapper,
	StyledInput,
	StyledButton,
	StyledErrorMessage,
	TitleWrapper,
	StyledAvatar,
	StyledTitle,
} from "../../components/StyledComponents/authStyle";
import { login } from "../../redux";
import Layout from "../../components/Layout";

const LoginPage = (props) => {
	const history = useHistory();
	const [clicked, setClicked] = useState(false);
	return (
		<Layout>
			<StyledWrapper>
				<TitleWrapper>
					<StyledAvatar icon={<UserOutlined />} />
					<StyledTitle>Log In</StyledTitle>
				</TitleWrapper>
				<Form
					onFinish={({ username, password }) => {
						props.login(username, password);
						setClicked(true);
					}}
				>
					<Form.Item
						name="username"
						rules={[
							{
								required: true,
								message: "Please input your username!",
							},
						]}
					>
						<StyledInput placeholder="Username" />
					</Form.Item>

					<Form.Item
						name="password"
						rules={[
							{
								required: true,
								message: "Please input your password!",
							},
						]}
					>
						<StyledInput.Password placeholder="Password" />
					</Form.Item>
					<Form.Item>
						<StyledButton type="primary" htmlType="submit">
							Login
						</StyledButton>
					</Form.Item>
				</Form>
				{clicked && !props.loading && <StyledErrorMessage>{props.errorMessage}</StyledErrorMessage>}
				<a href={() => false} onClick={() => history.push("/signup")}>
					Don't have an account? Sign Up
				</a>
			</StyledWrapper>
		</Layout>
	);
};

const mapStateToProps = (state) => {
	return {
		errorMessage: state.user.error,
		loggedIn: state.user.loggedIn,
		token: state.user.token,
		loading: state.user.loading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		login: (username, password) => dispatch(login(username, password)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
