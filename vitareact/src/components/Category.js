import React from 'react';
import style from './css/category.module.css';
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
        <div className={style.categoryContainer}>
            <h3 className={style.categoryContainerHeading}>Categories</h3>
            <div className={style.categoryRow}>
                <div className={style.categoryColumn}>
                    <Link to="/category/results/1">
                        <div className={style.category}>
                            <img className={style.categoryImage} src={comedy} alt="cat-img" />
                            <div className={style.categoryName}>Comedy</div>
                        </div> 
                    </Link>
                    <Link to="/category/results/4">
                        <div className={style.category}>
                            <img className={style.categoryImage} src={romance} alt="cat-img" />
                            <div className={style.categoryName}>Romance</div>
                        </div> 
                    </Link>
                    <Link to="/category/results/3">
                        <div className={style.category}>
                            <img className={style.categoryImage} src={music} alt="cat-img" />
                            <div className={style.categoryName}>Music</div>
                        </div> 
                    </Link>
                </div>
                <div className={style.categoryColumn}>
                    <Link to="/category/results/2">
                        <div className={style.category}>
                            <img className={style.categoryImage} src={action} alt="cat-img" />
                            <div className={style.categoryName}>Family</div>
                        </div> 
                    </Link>
                    <Link to="/category/results/5">
                        <div className={style.category}>
                            <img className={style.categoryImage} src={family} alt="cat-img" />
                            <div className={style.categoryName}>Family</div>
                        </div> 
                    </Link>
                    <Link to="/category/results/15">
                        <div className={style.category}>
                            <img className={style.categoryImage} src={war} alt="cat-img" />
                            <div className={style.categoryName}>War</div>
                        </div> 
                    </Link> 
                </div>
                <div className={style.categoryColumn}>
                    <Link to="/category/results/7">
                        <div className={style.category}>
                            <img className={style.categoryImage} src={biopic} alt="cat-img" />
                            <div className={style.categoryName}>Biopic</div>
                        </div> 
                    </Link>
                    <Link to="/category/results/8">
                        <div className={style.category}>
                            <img className={style.categoryImage} src={adventure} alt="cat-img" />
                            <div className={style.categoryName}>Adventure</div>
                        </div> 
                    </Link>
                    <Link to="/category/results/6">
                        <div className={style.category}>
                            <img className={style.categoryImage} src={crime} alt="cat-img" />
                            <div className={style.categoryName}>Crime</div>
                        </div> 
                    </Link> 
                </div>
                <div className={style.categoryColumn}>
                    <Link to="/category/results/9">
                        <div className={style.category}>
                            <img className={style.categoryImage} src={scifi} alt="cat-img" />
                            <div className={style.categoryName}>Sci-Fi</div>
                        </div> 
                    </Link>
                    <Link to="/category/results/11">
                        <div className={style.category}>
                            <img className={style.categoryImage} src={horror} alt="cat-img" />
                            <div className={style.categoryName}>Horror</div>
                        </div> 
                    </Link>
                    <Link to="/category/results/17">
                        <div className={style.category}>
                            <img className={style.categoryImage} src={history} alt="cat-img" />
                            <div className={style.categoryName}>History</div>
                        </div> 
                    </Link> 
                </div>
                <div className={style.categoryColumn}>
                    <Link to="/category/results/10">
                        <div className={style.category}>
                            <img className={style.categoryImage} src={documentry} alt="cat-img" />
                            <div className={style.categoryName}>Documentry</div>
                        </div> 
                    </Link>
                    <Link to="/category/results/12">
                        <div className={style.category}>
                            <img className={style.categoryImage} src={thriller} alt="cat-img" />
                            <div className={style.categoryName}>Thriller</div>
                        </div> 
                    </Link>
                    <Link to="/category/results/14">
                        <div className={style.category}>
                            <img className={style.categoryImage} src={animation} alt="cat-img" />
                            <div className={style.categoryName}>Animation</div>
                        </div> 
                    </Link> 
                </div>
                <div className={style.categoryColumn}>
                    <Link to="/category/results/13">
                        <div className={style.category}>
                            <img className={style.categoryImage} src={fantasy} alt="cat-img" />
                            <div className={style.categoryName}>Fantasy</div>
                        </div> 
                    </Link>
                    <Link to="/category/results/18">
                        <div className={style.category}>
                            <img className={style.categoryImage} src={drama} alt="cat-img" />
                            <div className={style.categoryName}>Drama</div>
                        </div> 
                    </Link>
                    <Link to="/category/results/16">
                        <div className={style.category}>
                            <img className={style.categoryImage} src={mystery} alt="cat-img" />
                            <div className={style.categoryName}>Mystery</div>
                        </div> 
                    </Link> 
                </div>
            </div>
        </div> 
    )
}

export default Category
