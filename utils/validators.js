function isValidPassword(password) {
    let isValid = true;

    if(password.length < 8) {
        isValid = false;
    }

    return isValid;
}

module.exports = {
    isValidPassword
}