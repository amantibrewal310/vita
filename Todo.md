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
* [ ] Social Login
* [ ] Basic Video Player
* [ ] Advanced Video Player
* [ ] Frontend

