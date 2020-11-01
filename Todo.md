# TODO:

-   [x] Video Model
-   [x] Comment Model
-   [x] Custome User Model
-   [x] Content Moderation Model
-   [x] Adding Category to Video model
-   [x] Payment Gateway
-   [x] Social Login
-   [x] Basic Video Player
-   [ ] Advanced Video Player
-   [ ] Frontend
-   [x] Membership Type
-   [x] Create Subscription
-   [ ] Cancel/Change Subcripton Plan
-   [ ] Change Database to Postgresql
-   [ ] Readme

# BUGS:

    - FB login Bug - Doesn't properly store token in localstorage
    - By default membership is not Free bcz if set membership to Free bydefault then when we delete the database and then try to create super user it throws Model DoesNot exist error and IntegrityError ---- Suggestion apply pre_save to membership model

    - loader for the payment gateway and also hide buy now button after one click.

# Django
    - video model (add field)
        - realease_at
    - user can report only once
    - validation backend (in serializer)
        - https://www.youtube.com/watch?v=u0qpTOmXvvs&list=PLx-q4INfd95EsUuON1TIcjnFZSqUfMf7s&index=3
    - change database postgres

    - single model that can handle, video watch count and store the previous palytime of the user 

# React=
    - increase video views on play
    - put a preloader when video create in admin, edit video

# Admin Dashboard
    - Users
        - total active users 
        - monthly registered new users - bar graph using api
        - membership wise + revenue 
        - percentage user with subsciption

    videos 
        - total
        - total published, draft, reported  
        - change status, published, drafted, reported
        - uploaded month wise chart - api
        - most liked, disliked, reported 

    - subscription 
        - change price, allow discount 

    - CRUD categories
    
    - reports 
        - list
        - detail 
        - respond 


    charts 
        - category wise movies 
    

# Features
    - reply feature in comments
    - pin feature in comments

# Ideas
    - captions
    - realtime notif 
    - register user activate


# Today


# IMPORTANT 
    - make Demo presentation script 
    - make demo video 
    - make project highlights script


- user video lastplaytime




- SCRIPT 
    - subscription
    - live search 
    - categories 
    - admin option on each video and comment when logged in 
