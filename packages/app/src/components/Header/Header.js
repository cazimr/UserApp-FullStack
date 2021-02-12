import React from "react";
import { StyledHeader, StyledAvatar,StyledTitle } from "./style";
import { UserOutlined } from "@ant-design/icons";

function Header() {
	return (
		<StyledHeader>
			<StyledAvatar icon={<UserOutlined />} />
			<StyledTitle>UserApp</StyledTitle>
		</StyledHeader>
	);
}

export default Header;
