# FullStack Monorepo Dummy Project
## Backend

### Using
* ES6 Javascript
* Node.js
* Express.js & Express Router
* Authentication with JSON web token (*jwt*)
* Password encryption with bcrypt (*salt&hash*)
* Mysql
* Development dependencies
  * Babel
  * Nodemon
  * Dotenv
  * Pino-Pretty
* Tests
  * Mocha & Chai
  * Multiple edge cases

### REST API Routes
* /signup -- Sign up to the system (username, password)
* /login -- Logs in an existing user with a password
* **/me** -- Get the currently logged in user information
* **/me/update-password** -- Update the current user's password
* /user/:id/ -- List username & number of likes of a user
* **/user/:id/like** -- Like a user
* **/user/:id/unlike** -- Unlike a user
* /most-liked -- List users in a most liked to least liked

Each user can like another only once, and they can unlike each other. The **bolded endpoints** are authenticated calls
