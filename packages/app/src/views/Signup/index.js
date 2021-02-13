import React, { useState } from "react";
import { Form } from "antd";
import { useHistory } from "react-router-dom";
import {signup} from './helpers'
import { UserOutlined } from "@ant-design/icons";

import {
	StyledWrapper,
	TitleWrapper,
	StyledTitle,
	StyledAvatar,
	StyledInput,
	StyledButton,
	StyledErrorMessage,
} from "../../components/StyledComponents/authStyle";
import Layout from "../../components/Layout";

const SignupPage = () => {
	const history = useHistory();
	const [errorMessage, setErrorMessage] = useState("");

	return (
		<Layout>
			<StyledWrapper>
				<TitleWrapper>
					<StyledAvatar icon={<UserOutlined />} />
					<StyledTitle>Sign Up</StyledTitle>
				</TitleWrapper>

				<Form onFinish={(data) => signup(data,setErrorMessage,history)}>
					<Form.Item
						name="username"
						rules={[
							{
								required: true,
								message: "Please input username!",
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
								message: "Please input password!",
							},
						]}
					>
						<StyledInput.Password placeholder="Password" />
					</Form.Item>

					<Form.Item
						name="retypePassword"
						rules={[
							{
								required: true,
								message: "Please retype password!",
							},
						]}
					>
						<StyledInput.Password placeholder="Retype password" />
					</Form.Item>

					<Form.Item>
						<StyledButton type="primary" htmlType="submit">
							Sign Up
						</StyledButton>
					</Form.Item>
				</Form>
				{errorMessage.length > 0 && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
			</StyledWrapper>
		</Layout>
	);
};

export default SignupPage;
