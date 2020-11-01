import React, {useState} from 'react'
import formStyles from '../../css/forms.module.css'
import axios from 'axios'

function CategoryItem({item, refreshCategories}) {

    const [showEditform, setShowEditForm] = useState(false);
    const [newCatName, setNewCatName] = useState(item.category);
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault()
        if(newCatName === '') {
            return
        }

        let formData = new FormData();
        formData.append('category', newCatName);
        if(image) {
            formData.append('image', image.image[0]);
        }
        console.log(formData)

        axios
            .patch(`http://127.0.0.1:8000/api/video/categories/${item.id}/`, formData)
            .then(res => {
                setShowEditForm(false);
                refreshCategories();
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <img src={item.image} width="100px" alt="cat-image" />
            <p>{item.category}</p>
            <button
                onClick={() => setShowEditForm(!showEditform)}    
            >
                Edit
            </button>
            {
                (showEditform)
                ? (
                    <div>
                        <input 
                            className={formStyles.input}
                            type="text"
                            name="category"
                            placeholder="updated name"  
                            value={newCatName}
                            onChange={(e) => setNewCatName(e.target.value)}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            id="image"
                            name="image"
                            onChange={(e) => 
                                setImage({
                                    image: e.target.files
                                }
                            )}
                        />

                        <button
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Save changes
                        </button>
                    </div>
                ): (
                    <></>
                )
            }
        </div>
    )
}

export default CategoryItem
