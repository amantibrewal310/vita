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

# React
    - set a link/button for admin for video detail page / comment detail page
    - increase video views on play
    - correct routes 
    - add a lot of description so search works well

# Admin Dashboard

    - for description of upload video add makdown editor
    - upload progress bar (or a preloader)

# Features

    - success pop up boxes after form fill
    - reply feature in comments
    - pin feature in comments
    - watch list for user

# Ideas
    - use google charts 
    - captions
    - realtime notif 
    - register user activate


# Today
    - admin
    - loaders
    - home page 
    - add to watchlist
        - convert into popup 
