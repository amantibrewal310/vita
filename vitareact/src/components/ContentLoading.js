
import React from 'react'
import Preloader from './utils/Preloader'

function ContentLoading(WrappedComponent) {
    return function ContentLoadingComponent({isLoading, ...props}) {
        if(!isLoading) {
            return <WrappedComponent {...props} />
        }
        return ( 
                <Preloader />
        )
    }
}

export default ContentLoading
