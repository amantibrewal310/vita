
function checkAdminLoggedIn() {
    return (localStorage.getItem('admin') == '1')
}

export default checkAdminLoggedIn
