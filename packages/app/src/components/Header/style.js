import styled from "styled-components";
import { Avatar } from "antd";

export const StyledAvatar = styled(Avatar)`
	background-color: white;
	color: gray;
	margin-right: 10px;
`;

export const StyledHeader = styled.header`
	background: ${({ theme }) => theme.colors.primary};
	display: flex;
	align-items: center;
	height: 70px;
	padding: 0 40px;
`;

export const StyledTitle = styled.h2`
	color: white;
	margin-top: 8px;
`
