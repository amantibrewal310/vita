
function checkLoggedIn() {
    const expiry_time = localStorage.getItem('expiry_time');
    if(expiry_time === undefined || expiry_time < new Date().getTime()) {
        return false;
    }
    return true;
}

export default checkLoggedIn
