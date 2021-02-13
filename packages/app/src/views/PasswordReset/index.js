import React from "react";
import { Form } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { resetUserPassword} from '../../redux';
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

const PasswordResetPage = () => {
	const { token, error } = useSelector((state) => ({ token: state.user.token, error: state.user.error }));

	const dispatch = useDispatch();
	return (
		<Layout>
			<StyledWrapper>
				<TitleWrapper>
					<StyledAvatar icon={<UserOutlined />} />
					<StyledTitle>Password Reset</StyledTitle>
				</TitleWrapper>

				<Form
					onFinish={({ password, retypePassword }) => {
						if (password !== retypePassword) error = "You haven't retyped your password correctly";
                        dispatch(resetUserPassword(password,token));
					}} style={{width: '20em'}}
				>
					<Form.Item
						name="password"
						rules={[
							{
								required: true,
								message: "Please input password!",
							},
						]}
					>
						<StyledInput.Password placeholder="New Password" />
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
						<StyledInput.Password placeholder="Retype new password" />
					</Form.Item>

					<Form.Item>
						<StyledButton type="primary" htmlType="submit" style={{width: '10em', marginLeft: '25%'}}>
							Reset Password
						</StyledButton>
					</Form.Item>
				</Form>
				{ (error.length > 0) && <StyledErrorMessage>{error}</StyledErrorMessage>}
			</StyledWrapper>
		</Layout>
	);
};

export default PasswordResetPage;
