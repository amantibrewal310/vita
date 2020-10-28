import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import SendToken from './SendToken'
import SetPassword from './SetPassword'
import VerifyToken from './VerifyToken'

function ForgotPassword() {
    const history = useHistory()
   
    const initAppData = {
        tokenSent: false,
        tokenVerified: false,
        newPasswordSet: false,
    }
    const initTokenData = {
        token: null,
        udi: null
    }
    // states
    const [appData, setAppData] = useState(initAppData)
    const [tokenData, setTokenData] = useState(initTokenData);

    // called after any one of the three process complete
    const setAppDataOnProcess = (process) => {
        if(process === "token sent") {
            setAppData({
                ...appData,
                tokenSent: true
            })
        } else if(process === "token verified") {
            setAppData({
                ...appData,
                tokenVerified: true
            })
        } else if(process === "new password set") {
            setAppData({
                ...appData,
                newPasswordSet: true
            })
            history.push('/login');
            window.location.reload();
        } else {
            console.log('invalid process');
        }
    }

    // called after token verification
    const setTokenAndUid = (token, uid) => {
        console.log('token uid set');
        console.log(token);
        console.log(uid);
        setTokenData({
            token: token,
            uid: uid
        });
    }

    return (
        <div>
        {
            (!appData.tokenSent)
            ? ( <SendToken setAppDataOnProcess={setAppDataOnProcess}/> ) 
            : (<></>)
        }
        {   
            (appData.tokenSent && !appData.tokenVerified)
            ? (<VerifyToken setAppDataOnProcess={setAppDataOnProcess} setTokenAndUid={setTokenAndUid}/>)
            : (<></>)
        }
        {
            (appData.tokenSent && appData.tokenVerified && !appData.newPasswordSet)
            ? ( <SetPassword setAppDataOnProcess={setAppDataOnProcess} token={tokenData.token} uid={tokenData.uid} /> )
            : (<></>)
        }
        </div>
    )
}

export default ForgotPassword
