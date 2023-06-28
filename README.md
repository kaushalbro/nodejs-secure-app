# nodejs-secure-app # BLOG API/E_NEWSPAPER API

#ROUTES

  (AUTH ROUTES)

   |-> /api/auth/login (GET, POST)     :Get login page and POST user's credentials  <br />
   |-> /api/auth/signup (GET, POST)     :Get Signup page and POST Signup new user's credentials  <br />
   |-> /api/auth/signup (GET, POST)     :Get Signup page and POST Signup new user's credentials  <br />
   |-> /api/auth/logout (GET)           :Logout from current logged in session <br />


  (REFRESH_TOKEN route)
   |-> /api/refreshToken/ (GET)         :Get refresh token only if access token is provided and is valid

   (Email verification route)
   |-> /api/verify_email/:token (GET)   :Get sent token from user's mail and verify

   
 
  #GET METHOD
   (POSTS object)
 |-> /api/posts/                        :Get all Published posts
 |-> /api/posts/id/:id                  :getPublishedPostsById)
 |-> /api/posts/author/:author_name     ::getAllPublishedPostsByAuthorName
 |-> /api/posts/category/:category_id   ::getAllPublishedPostsByCategoryID
 |-> /api/posts/category/:category_name ::getAllPublishedPostsByCategoryName(Not Yet implemented)
 |-> /api/posts/:year                   ::getAllPublishedPostsByYear
 |-> /api/posts/:year/:month            ::getAllPublishedPostsByMonth
 |-> /api/posts/:year/:month/:day       ::getAllPublishedPostsByDay
 
      (USERS OBJECT)
 |-> /api/users/                        :get all users
 |-> /api/users/:id                	:get user by ID


      (CATEGORY OBJECT)
 |-> /api/category/              	:get all category
 |-> /api/category/:cat_name            :get all published posts by category name (Not yet implemented)


      (ADVERTISEMENT OBJECT)
 |-> /api/ads/                   	:get all Advertisements 
 |-> /api/ads/:id               	:get Advertisement by id (not implemented)


      (SUSCRIBER OBJECT)
 |-> /api/subscribers/          	:get all subscriber 
 |-> /api/subscribers/:id        	:get subscriber by id 


#POST METHOD

     (For Posts object)
 |-> /api/posts/                        :Create New post (Unautorized used cannot create post only admin and Editor can)
 
     (For USERS object)
 |-> /api/users/                        :Create New User (Only by admin)

      (CATEGORY OBJECT)
 |-> /api/category/                     :create new category (Only by admin)

      (ADVERTISEMENT OBJECT)
 |-> /api/ads/                          :Create new Advertisement 


   (SUSCRIBER OBJECT)
 |-> /api/subscribers/                  :create new subscriber 


#DELETE METHOD
     (For POSTS object)
 |-> /api/posts/id/:id                  : Delete only self published post for Editor level
 
     (For USERS object)
 |-> /api/users/:id                     :Delete User By ID (Only by admin)


      (CATEGORY OBJECT)
 |-> /api/category/:id                  :Delete Category By ID (Only by admin)


      (ADVERTISEMENT OBJECT)
 |-> /api/ads/:id                       :Delete Advertisement by id 



 (SUSCRIBER OBJECT)
 |-> /api/subscribers/:id               :Delete Subscriber by id



#PATCH METHOD
     (For POSTS object)
 |-> /api/posts/:id                     : Update only self published post for Editor level

     (For USERS object)
 |-> /api/users/:id                     :Update User By ID (Only by admin)

      (CATEGORY OBJECT)
 |-> /api/category/:id                  :Update Category By ID (Only by admin)

      (ADVERTISEMENT OBJECT)
 |-> /api/ads/:id                       :Update Advertisement by id 

 (SUSCRIBER OBJECT)
 |-> /api/subscribers/:id               :Update Subscriber by id








