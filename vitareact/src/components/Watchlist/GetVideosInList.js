import axiosInstance from '../../axios'

async function GetVideosInList(id) {
    return await axiosInstance.get(`video/watchlist/${id}/`)    
}

export default GetVideosInList
