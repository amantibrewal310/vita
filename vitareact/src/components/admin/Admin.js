import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '../css/adminHome.css'

// Admin Options Avalailable 

// Video options
    // components
        // 1. video result box [for search/filter results] / by default shows recently reported videos
    // Features 
        // 1. Upload new  video
        // 2. Search for videos 
        // 3. Filter, Sort for videos [by most reported, date/time ... etc]
        // 4. Link to detail page

// Comment options
    // components 
        // 1. comment result box [for filter results] / by default shows recently reported comments
    // Featurs 
        // 1. Filter, Sort for videos [by most reported, date/time... etc]
        // 2. Link to detail page 

function Admin() {

    const initHeading = {
        videoHeading: 'Recent Video Reports',
        commentHeading: 'Recent Comment Reports'
    }
    const [boxHeading, setBoxHeading] = useState(initHeading)

    const handleSearchChange = () => {
    }
    const handleSearchSubmit = () => {
    }

    return (
        <div>
            <h1><u>Admin Home</u></h1>
            
            <Link to={`/admin/create`}><button id="create-new-btn">Create New</button></Link>
            
            <div id='search-container'>
                <input 
                    id='admin-search-box'
                    type='text' 
                    name='searchbox' 
                    onChange={handleSearchChange}
                    placeholder='Search Videos'
                />
                <button 
                    id='admin-search-btn'
                    type='submit'
                    onClick={handleSearchSubmit}
                >
                    Search
                </button>
            </div>

            <div>  
                <h2>Options</h2>
                <h3>Sort</h3>
                <button>Most views</button>
                <button>Most Likes</button>
                <h3>Filters</h3>
                <button>Most Reported</button>
            </div>

            <div className="row">
                <div className="col">
                    {/* heading changes based on serach/filter applied */}
                    <h2>{boxHeading.videoHeading}</h2>
                </div>
                <div className="col">
                    {/* heading changes based on serach/filter applied */}
                    <h2>{boxHeading.commentHeading}</h2>
                </div>
            </div>
        </div>
    )
}

export default Admin
