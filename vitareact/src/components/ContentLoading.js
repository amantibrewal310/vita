
import React from 'react'

function ContentLoading(WrappedComponent) {
    return function ContentLoadingComponent({isLoading, ...props}) {
        if(!isLoading) {
            return <WrappedComponent {...props} />
        }
        // TODO:
        // display a nice loader, write css for 
        //  a smaller and a bigger version
        // >> <Loader type="big/small" />
        // write css of both in PreLoader.js file 
        // apply css with respect to props[big/small] 
        return ( 
            <div>
                Waiting for the data......
            </div>
        )
    }
}

export default ContentLoading
