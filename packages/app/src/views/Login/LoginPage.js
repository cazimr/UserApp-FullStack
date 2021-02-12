import React from "react";
import { Form } from "antd";
import { connect } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { LoginWrapper, StyledInput, StyledButton, StyledAvatar } from "./style";
import { login } from "../../redux";
import Layout from "../../components/Layout";

function LoginPage(props) {
	return (
		<Layout>
			<LoginWrapper>
				<StyledAvatar icon={<UserOutlined />} />
				<Form onFinish={({ username, password }) => props.login(username, password)}>
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
				{props.errorMessage && <div style={{ color: "red" }}>{props.errorMessage}</div>}
			</LoginWrapper>
		</Layout>
	);
}

const mapStateToProps = (state) => {
	return {
		errorMessage: state.user.error,
		loggedIn: state.user.loggedIn,
		token: state.user.token,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		login: (username, password) => dispatch(login(username, password)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
