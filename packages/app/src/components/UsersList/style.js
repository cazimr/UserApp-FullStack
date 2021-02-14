import { Avatar } from "antd";
import styled from "styled-components";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

export const StyledAvatar = styled(Avatar)`
	background-color: white;
	color: ${({ theme }) => theme.colors.titlePrimary};
	margin-right: 2px;
	margin-top: 9px;
`;

export const StyledTitle = styled.h2`
	margin-top: 0.2em;
	margin-left: 2.5em;
	color: ${({ theme }) => theme.colors.titlePrimary};
`;

export const MainWrapper = styled.div`
	width: 25em;
	height: 100%;
	display: flex;
	flex-direction: column;
	padding-top: 2em;
`;
export const StyledHeartFilled = styled(HeartFilled)`
	color: ${({ theme }) => theme.colors.primary};
	margin-top: -5px;
	&:hover {
		cursor: pointer;
	}
`;
export const StyledHeartOutlined = styled(HeartOutlined)`
	color: ${({ theme }) => theme.colors.primary};
	margin-top: -5px;
	&:hover {
		cursor: pointer;
	}
`;
