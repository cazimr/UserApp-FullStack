//test if password contains 5+ characters, a letter and a number
const verifyPassword = (pass) => {
    if(pass.length<5) return false;
    let hasALetter = /[a-zA-Z]/.test(pass);
    let hasANumber = /\d/.test(pass);
    return hasALetter && hasANumber;
}

export default verifyPassword;