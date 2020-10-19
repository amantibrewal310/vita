# TODO:

```
<!-- Building the Categories -->

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Video(models.Model):
    ........
    ......

    <!-- adding category to video model -->

    category = models.ForeignKey(
        Category, on_delete= models.PROTECT, default=1)
```
* [x] Video Model
* [x] Comment Model
* [x] Custome User Model
* [ ] Content Moderation Model 
* [ ] Adding Category to Video model
* [ ] Payment
* [x] Social Login
* [ ] Basic Video Player
* [ ] Advanced Video Player
* [ ] Frontend

# BUGS:
	- FB login Bug - Doesn't properly store token in localstorage


# React
    - try getting video list while user is authenticated
    - redirect to login page if user tries to play video

# Admin Dashboard
    - for description of upload video add makdown editor 