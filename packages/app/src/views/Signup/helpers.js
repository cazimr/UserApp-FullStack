import axios from 'axios';


export const signup = ({username,password,retypePassword},setErrorMessage,history) => {


    if (password !== retypePassword) return setErrorMessage("You haven't retyped your password correctly");
    axios
        .post("http://localhost:5000/signup", { username, password })
        .then((res) => {
            
            if (res.status === 201) {
                alert("Successful signup!");
                history.push("/login");
            } else {
                setErrorMessage(res.data);
            }
        })
        .catch((err) => {
            if (err.response.data.includes('<!DOCTYPE html>')) setErrorMessage(err.message);
            else {
                setErrorMessage(err.response.data);
            }
        });
};