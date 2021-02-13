import React from 'react'
import * as style from './style';
import {useHistory} from 'react-router-dom';

const User = ({username,likes}) => {
    const history = useHistory();
    return (
        <style.MainContainer>
            <style.StyledAvatar icon = {<style.LargeIcon/>}/>
            <style.FlexColumn>
                {username && <style.StyledTitle>{username}</style.StyledTitle>}
                {likes && <style.StyledSubTitle>Likes: {likes}</style.StyledSubTitle>}
                <a onClick={()=> {console.log("Debil"); history.push('/resetPassword')}}>Reset password</a>
            </style.FlexColumn>
            
        </style.MainContainer>
    )
}

export default User;
