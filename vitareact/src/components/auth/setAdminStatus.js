import axios from 'axios'

// get user data by email
function setAdminStatus(email) {
    console.log('setting admin status');
    axios.get(`http://127.0.0.1:8000/api/user/byemail/${email}/`)
        .then(res => {
            localStorage.setItem('admin', (res.data.is_staff)? '1' : '0');
			window.location.href = "/";
        });
}

export default setAdminStatus;
