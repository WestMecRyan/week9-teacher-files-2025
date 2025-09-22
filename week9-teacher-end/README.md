## Install Dependencies

`npm i dotenv bcrypt jsonwebtoken cookie-parser`

## create .env file

```bash
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-here
MONGODB_URI=mongodb://localhost:27017/your-app-name
NODE_ENV=development
```
- Important: make sure `.env` is in `.gitignore`

## Install MongoDB dependencies
`npm i mongoose`

## Next Steps
### Create User model/schema
### Replace file operations with mongodb operations
### Update routes to use MongoDB instead of JSON file

## Authentication Layer
### Add user registration wit JWT
- Add password field to user model
- create authentication routes
`POST /auth/register` user registration
`POST /auth/login` user login
`POST /auth/logout` clear JWT token
- create JWT middleware for route protection
- add authentication forms/templates

## Auth & Route Protection
- Protect existing routes with JWT middleware
- Add role-based permissions (admin vs regular user)
- update frontend to handle authentication