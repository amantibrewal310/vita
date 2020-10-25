
function checkLoggedIn() {
    const expiry_time = localStorage.getItem('expiry_time');
    if(expiry_time === undefined) {
        return false;
    } else if(expiry_time < new Date().getTime()) {
        localStorage.removeItem('access_token');
	    localStorage.removeItem('refresh_token');
	    localStorage.removeItem('expiry_time');
	    localStorage.removeItem('email');
        localStorage.removeItem('admin');
        return false;
    }
    return true;
}

export default checkLoggedIn
