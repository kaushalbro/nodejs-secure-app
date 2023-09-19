﻿# nodejs-secure-app # BLOG API/E_NEWSPAPER API (MVC PATTERN) BY Kaushal 

Note: Used free templates for admin panel for frontend for now

# ROUTES

      (AUTH OBJECT)

|-> /api/auth/login (GET, POST) :Get login page and POST user's credentials <br />
|-> /api/auth/signup (GET, POST) :Get Signup page and POST Signup new user's credentials <br />
|-> /api/auth/logout (GET) :Logout from current logged in session <br />

      (REFRESH_TOKEN OBJECT)

|-> /api/refreshToken/ (GET) :Get refresh token only if access token is provided and is valid <br />

      (EMAIL_VERIFICATION OBJECT)

|-> /api/verify_email/:token (GET) :Get sent token from user's mail and verify <br />

# GET METHOD <br />

      (POST OBJECT)

|-> /api/posts/ :Get all Published posts <br />
|-> /api/posts/id/:id :getPublishedPostsById <br />
|-> /api/posts/author/:author_name ::getAllPublishedPostsByAuthorName <br />
|-> /api/posts/category/:category_id ::getAllPublishedPostsByCategoryID <br />
|-> /api/posts/category/:category_name ::getAllPublishedPostsByCategoryName(Not Yet implemented) <br />
|-> /api/posts/:year ::getAllPublishedPostsByYear <br />
|-> /api/posts/:year/:month ::getAllPublishedPostsByMonth <br />
|-> /api/posts/:year/:month/:day ::getAllPublishedPostsByDay <br />

      (USERS OBJECT)

|-> /api/users/ :get all users <br />
|-> /api/users/:id :get user by ID <br />

      (CATEGORY OBJECT)

|-> /api/category/ :get all category <br />
|-> /api/category/:cat_name :get all published posts by category name (Not yet implemented) <br />

      (ADVERTISEMENT OBJECT)

|-> /api/ads/ :get all Advertisements <br />
|-> /api/ads/:id :get Advertisement by id (not implemented) <br />

      (SUSCRIBER OBJECT)

|-> /api/subscribers/ :get all subscriber <br />
|-> /api/subscribers/:id :get subscriber by id <br />

# POST METHOD

     (For Posts object)

|-> /api/posts/ :Create New post (Unautorized used cannot create post only admin and Editor can) <br />

     (For USERS object)

|-> /api/users/ :Create New User (Only by admin) <br />

      (CATEGORY OBJECT)

|-> /api/category/ :create new category (Only by admin) <br />

      (ADVERTISEMENT OBJECT)

|-> /api/ads/ :Create new Advertisement <br />

(SUSCRIBER OBJECT)
|-> /api/subscribers/ :create new subscriber <br />

# PATCH METHOD

     (For POSTS object)

|-> /api/posts/:id : Update only self published post for Editor level <br />

     (For USERS object)

|-> /api/users/:id :Update User By ID (Only by admin) <br />

      (CATEGORY OBJECT)

|-> /api/category/:id :Update Category By ID (Only by admin) <br />

      (ADVERTISEMENT OBJECT)

|-> /api/ads/:id :Update Advertisement by id <br />

(SUSCRIBER OBJECT)
|-> /api/subscribers/:id :Update Subscriber by id <br />

# DELETE METHOD

     (For POSTS object)

|-> /api/posts/id/:id : Delete only self published post for Editor level <br />

     (For USERS object)

|-> /api/users/:id :Delete User By ID (Only by admin) <br />

      (CATEGORY OBJECT)

|-> /api/category/:id :Delete Category By ID (Only by admin) <br />

      (ADVERTISEMENT OBJECT)

|-> /api/ads/:id :Delete Advertisement by id <br />

      (SUBSCRIBERS OBJECT)

|-> /api/subscribers/:id :Delete Subscriber by id <br />
