import React from "react";
import * as style from "./style";
import { UserOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux";

function Header() {
	const loggedIn = useSelector((state) => state.user.loggedIn);
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

	const iconStyle = {
		paddingRight: "10px",
		paddingTop: "5px",
		color: "white",
		fontSize: "20px",
	};

	return (
		<style.StyledHeader>
			<style.FlexRow>
				<style.StyledAvatar icon={<UserOutlined />} />
				<style.StyledTitle onClick={() => history.push("/home")}>UserHome</style.StyledTitle>
			</style.FlexRow>

			{location.pathname !== "/login" && (
				<style.FlexRow>
					{loggedIn ? <LoginOutlined style={iconStyle} /> : <LogoutOutlined style={iconStyle} />}
					<style.StyledLink
						onClick={() => {
							loggedIn ? dispatch(logoutUser()) : history.push("/login");
						}}
					>
						{loggedIn ? "Logout" : "Login"}
					</style.StyledLink>
				</style.FlexRow>
			)}
		</style.StyledHeader>
	);
}

export default Header;
