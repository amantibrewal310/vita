import React from 'react'
import '../css/preloader.css'

function Preloader() {
    return (
        <div className="loader">
            <div className="loader__square">
                <span className="loader__square--part part-1"></span>
                <span className="loader__square--part part-2"></span>
                <span className="loader__square--part part-3"></span>
                <span className="loader__square--part part-4"></span>
            </div>
        </div>
    )
}

export default Preloader
