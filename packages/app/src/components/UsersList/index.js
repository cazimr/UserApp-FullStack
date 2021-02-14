import React from "react";
import { List } from "antd";
import * as style from "./style";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { userLike, userUnlike, getUsers } from "../../redux";

function UsersList({ users, likedUsers, id, token }) {
	const dispatch = useDispatch();
	return (
		<style.MainWrapper>
			<style.StyledTitle>Users</style.StyledTitle>
			<List
				itemLayout="horizontal"
				dataSource={users}
				style={{ padding: "0em 2em 2em 2em" }}
				renderItem={(user) => (
					<List.Item key={user.id} style={{ marginTop: "1em", width: "15em" }}>
						<List.Item.Meta
							avatar={<style.StyledAvatar icon={<UserOutlined style={{ fontSize: "22px" }} />} />}
							title={user.username}
							description={<div>Likes: {user.likes}</div>}
						/>
						{id && user.id !== id ? (
							likedUsers && likedUsers.includes(user.id) ? (
								<style.StyledHeartFilled
									onClick={() => {
										dispatch(userUnlike(user.id, token));
									}}
								/>
							) : (
								<style.StyledHeartOutlined
									onClick={() => {
										dispatch(userLike(user.id, token));
									}}
								/>
							)
						) : (
							""
						)}
					</List.Item>
				)}
			></List>
		</style.MainWrapper>
	);
}

export default UsersList;
