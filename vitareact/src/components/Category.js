import React from 'react';
import './css/category.css';
import {Link} from 'react-router-dom'
import comedy from '../images/category/comedy.jpeg'
import action from '../images/category/action.jpeg'
import music from '../images/category/music.jpeg'
import romance from '../images/category/romance.jpeg'
import family from '../images/category/family.jpeg'
import crime from '../images/category/crime.jpeg'
import biopic from '../images/category/biopic.jpeg'
import adventure from '../images/category/adventure.jpeg'
import scifi from '../images/category/sci-fi.jpeg'
import documentry from '../images/category/documentry.jpeg'
import horror from '../images/category/horror.jpeg'
import thriller from '../images/category/thriller.jpeg'
import fantasy from '../images/category/fantasy.jpeg'
import animation from '../images/category/animation.jpeg'
import war from '../images/category/war.jpeg'
import mystery from '../images/category/mystery.jpeg'
import history from '../images/category/history.jpeg'
import drama from '../images/category/drama.jpeg'



function Category() {

    return (
        <div className="category-container">
            <h3>Categories</h3>
            <div className="category-row">
                <div className="category-column">
                    <Link to="/category/results/1">
                        <div className='category'>
                            <img src={comedy} alt="cat-img" />
                            <div className='category-name'>Comedy</div>
                        </div> 
                    </Link>
                    <Link to="/category/results/2">
                        <div className='category'>
                            <img src={romance} alt="cat-img" />
                            <div className='category-name'>Romance</div>
                        </div> 
                    </Link>
                    <Link to="/category/results/3">
                        <div className='category'>
                            <img src={music} alt="cat-img" />
                            <div className='category-name'>Music</div>
                        </div> 
                    </Link>
                </div>
                <div className="category-column">
                    <Link to="/category/results/4">
                        <div className='category'>
                            <img src={action} alt="cat-img" />
                            <div className='category-name'>Family</div>
                        </div> 
                    </Link>
                    <Link to="/category/results/5">
                        <div className='category'>
                            <img src={family} alt="cat-img" />
                            <div className='category-name'>Family</div>
                        </div> 
                    </Link>
                    <Link to="/category/results/6">
                        <div className='category'>
                            <img src={war} alt="cat-img" />
                            <div className='category-name'>War</div>
                        </div> 
                    </Link> 
                </div>
                <div className="category-column">
                    <Link to="/category/results/7">
                        <div className='category'>
                            <img src={biopic} alt="cat-img" />
                            <div className='category-name'>Biopic</div>
                        </div> 
                    </Link>
                    <Link to="/category/results/8">
                        <div className='category'>
                            <img src={adventure} alt="cat-img" />
                            <div className='category-name'>Adventure</div>
                        </div> 
                    </Link>
                    <Link to="/category/results/9">
                        <div className='category'>
                            <img src={crime} alt="cat-img" />
                            <div className='category-name'>Crime</div>
                        </div> 
                    </Link> 
                </div>
                <div className="category-column">
                    <Link to="/category/results/10">
                        <div className='category'>
                            <img src={scifi} alt="cat-img" />
                            <div className='category-name'>Sci-Fi</div>
                        </div> 
                    </Link>
                    <Link to="/category/results/11">
                        <div className='category'>
                            <img src={horror} alt="cat-img" />
                            <div className='category-name'>Horror</div>
                        </div> 
                    </Link>
                    <Link to="/category/results/12">
                        <div className='category'>
                            <img src={history} alt="cat-img" />
                            <div className='category-name'>History</div>
                        </div> 
                    </Link> 
                </div>
                <div className="category-column">
                    <Link to="/category/results/13">
                        <div className='category'>
                            <img src={documentry} alt="cat-img" />
                            <div className='category-name'>Documentry</div>
                        </div> 
                    </Link>
                    <Link to="/category/results/14">
                        <div className='category'>
                            <img src={thriller} alt="cat-img" />
                            <div className='category-name'>Thriller</div>
                        </div> 
                    </Link>
                    <Link to="/category/results/15">
                        <div className='category'>
                            <img src={animation} alt="cat-img" />
                            <div className='category-name'>Animation</div>
                        </div> 
                    </Link> 
                </div>
                <div className="category-column">
                    <Link to="/category/results/16">
                        <div className='category'>
                            <img src={fantasy} alt="cat-img" />
                            <div className='category-name'>Fantasy</div>
                        </div> 
                    </Link>
                    <Link to="/category/results/17">
                        <div className='category'>
                            <img src={drama} alt="cat-img" />
                            <div className='category-name'>Drama</div>
                        </div> 
                    </Link>
                    <Link to="/category/results/18">
                        <div className='category'>
                            <img src={mystery} alt="cat-img" />
                            <div className='category-name'>Mystery</div>
                        </div> 
                    </Link> 
                </div>
            </div>
        </div> 
    )
}

export default Category
