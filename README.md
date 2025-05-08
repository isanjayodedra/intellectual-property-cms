# Intellectual Property CMS

Intellectual property (IP) refers to creations of the mind, like inventions, literary and artistic works, designs, and symbols, names, and images used in commerce, protected by law through patents, copyright, and trademarks.

## 📦 Project Structure

- **Gateway** - API Gateway to route traffic to services
- **Auth Service** - User authentication and authorization (JWT-based)
- **Article Service** - Manage articles, blocks, and content
- **Common Service** - Shared reusable modules
- **Queue Service** - Background jobs (Redis + Bull)

## 🚀 Getting Started

### Prerequisites

- Docker and Docker Compose installed

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/isanjayodedra/intellectual-property-cms.git
   cd intellectual-property-cms
   ```

2. Copy environment files:
   ```bash
   cp ./auth-service/.env.example ./auth-service/.env
   cp ./article-service/.env.example ./article-service/.env
   cp ./common-service/.env.example ./common-service/.env
   cp ./queue-service/.env.example ./queue-service/.env
   cp ./gateway/.env.example ./gateway/.env
   ```

3. Start all services with Docker Compose:
   ```bash
   docker-compose up --build
   ```

4. Access services:
   - Gateway: http://localhost:3000
   - Auth Service: http://localhost:3001
   - Common Service: http://localhost:4002
   - Queue Service: http://localhost:4003
   - Article Service: http://localhost:3004
   
5. MySQL Database:
   - Host: `localhost`
   - Port: `3306`
   - User: `ipcms_user`
   - Password: `ipcms_password`
   - Database: `ipcms_db`

6. Redis Server:
   - Host: `localhost`
   - Port: `6379`

## ⚙️ Services Overview

| Service | Port | Description |
|:--------|:-----|:------------|
| Gateway | 3000 | Entry point for all API traffic |
| Auth Service | 3001 | Handles user login/signup |
| Common Service | 3002 | Shared utilities and modules |
| Queue Service | 3003 | Background jobs (email, notifications) |
| Article Service | 3004 | CRUD operations for articles |
| MySQL | 3306 | Database |
| Redis | 6379 | Queue Backend |


## 🛠 Tech Stack

- **ORM**: [Sequelize](https://sequelize.org/)  orm for object data modeling
- **Migration and Seed**: DB migration and Seed using [Sequelize-CLI](https://github.com/sequelize/cli) 
- **Authentication and authorization**: using [passport](http://www.passportjs.org)
- **Error handling**: centralized error handling
- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **Logging**: using [winston](https://github.com/winstonjs/winston) 
- **Testing**: unittests using [Mocha](https://mochajs.org/)
- **Caching**: Caching using [Redis](https://redis.io/)
- **Bidirectional Communication**: using [Scoket](https://socket.io/)
- **Job scheduler**: with [Node-cron](https://www.npmjs.com/package/node-cron)
- **Dependency management**: with [Yarn](https://yarnpkg.com)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Docker support**
- **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)

## 🔒 Security Features

- JWT Token Authentication
- Password Hashing (bcryptjs)
- Environment Variable Management (.env)

## Commands

Running locally:

```bash
npm run dev
```

Running in production:

```bash
npm run start
```

Testing:

```bash
# run all tests
npm run test

```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
#Server environment
NODE_ENV=development
#Port number
PORT=3000

#Db configuration
DB_HOST=db-host
DB_USER=db-user
DB_PASS=db-pass
DB_NAME=db-name


# JWT secret key
JWT_SECRET=your-jwt-secret-key
# Number of minutes after which an access token expires
JWT_ACCESS_EXPIRATION_MINUTES=5
# Number of days after which a refresh token expires
JWT_REFRESH_EXPIRATION_DAYS=30

#Log config
LOG_FOLDER=logs/
LOG_FILE=%DATE%-app-log.log
LOG_LEVEL=error

#Redis
REDIS_HOST=redis-host
REDIS_PORT=6379
REDIS_USE_PASSWORD=no
REDIS_PASSWORD=your-password

```

## Project Structure for each Services

```
specs\
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--dao\            # Data Access Object for models
 |--db\             # Migrations and Seed files
 |--models\         # Sequelize models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--helper\         # Helper classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--cronJobs.js     # Job Scheduler
 |--index.js        # App entry point
```

## 🧪 Testing

```javascript
// auth-service/tests/auth.test.js

const request = require('supertest');
const app = require('../src/index');

describe('Auth Service - Login API', () => {
  it('should login successfully with valid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'Test@1234',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
```

Run tests with:
```bash
npm run test
```

## 📄 License

This project is licensed under the [MIT](LICENSE)

---

_Developed with ❤️ by [Sanjay Odedra](https://github.com/isanjayodedra)_
