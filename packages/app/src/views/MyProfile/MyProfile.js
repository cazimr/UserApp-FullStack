import React,{useEffect} from 'react'
import {connect} from 'react-redux';
import Layout from '../../components/Layout';
import { getUserInfo,logoutUser } from '../../redux';



function MyProfile(props) {
    useEffect(()=>{
        props.getUserInfo(props.token)
    },[])
    return (
        <Layout>
            {props.data && JSON.stringify(props.data)}
            <button onClick={props.logoutUser}>Logout</button>
        </Layout>
    )
}

const mapStateToProps = state => {
    return{
        token: state.user.token,
        error: state.user.error,
        data: state.user.data
    }
}


const mapDispatchToProps = (dispatch) => {
	return {
		getUserInfo: (token) => dispatch(getUserInfo(token)),
        logoutUser: ()=> dispatch(logoutUser()),

	};
};

export default connect(mapStateToProps,mapDispatchToProps)(MyProfile);
