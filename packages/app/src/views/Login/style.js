import styled from "styled-components";
import { Input,Button } from "antd";
import { Avatar } from "antd";

export const LoginWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
    margin-top: 11%;
    padding-right: 5em;
`;


export const StyledInput = styled(Input)`
	width: 20em;
`;

export const StyledButton = styled(Button)`
	background-color: ${({theme})=>theme.colors.primary};
	border-color: ${({theme})=>theme.colors.primary};
	&:hover, &:focus{
		background-color: ${({theme})=>theme.colors.primaryLight};
		border-color: ${({theme})=>theme.colors.primary};
	}
	color: white;
	width: 8em;
	margin-left: 30%;
	margin-top: 1.5em;
`

export const StyledAvatar = styled(Avatar)`
	background-color: ${({theme})=>theme.colors.primary};
	color: white;
	margin-bottom: 1.5em;
	width: 2.2em;
	height: 2.2em;
	padding-top: 3px;

`;