# Raahein Travel Platform - Backend

[![Node.js CI](https://github.com/yourusername/raahein/actions/workflows/node.js.yml/badge.svg)](https://github.com/yourusername/raahein/actions/workflows/node.js.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Backend API for the Raahein Travel Platform, providing AI-powered travel destination recommendations and user management.

## Features

- 🔍 AI-powered travel destination suggestions using Google's Gemini API
- 🔐 JWT-based authentication with Firebase
- 📝 Input validation and sanitization
- 📊 Request rate limiting
- 📚 API documentation with Swagger UI
- 📝 Structured logging
- 🚀 Production-ready configuration

## Prerequisites

- Node.js (v14.x or higher)
- npm (v7.x or higher) or yarn
- MongoDB database
- Google Cloud account with Gemini API enabled
- Firebase project for authentication

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=8000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb://localhost:27017/raahein

# Google Gemini API
GEMINI_API_KEY=your-gemini-api-key

# Firebase Admin SDK (for authentication)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nPrivate\nKey\n-----END PRIVATE KEY-----\n"

# JWT
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/raahein.git
   cd raahein/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. For production:
   ```bash
   npm run build
   npm start
   # or
   yarn build
   yarn start
   ```

## API Documentation

Once the server is running, you can access the API documentation at:

- **Swagger UI**: http://localhost:8000/api-docs
- **JSON Spec**: http://localhost:8000/api-docs.json

## Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm start` - Start production server
- `npm run build` - Transpile TypeScript to JavaScript
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## Project Structure

```
backend/
├── config/               # Configuration files
│   ├── logger.js         # Winston logger configuration
│   ├── swagger.js        # Swagger/OpenAPI configuration
│   └── ...
├── controllers/          # Route controllers
│   ├── aiController.js   # AI recommendation logic
│   └── ...
├── middlewares/          # Custom express middlewares
│   ├── auth.js           # Authentication middleware
│   └── ...
├── models/              # Mongoose models
│   ├── User.js           # User model
│   └── ...
├── routes/              # API routes
│   ├── aiRoutes.js       # AI recommendation routes
│   └── ...
├── services/            # Business logic
│   ├── aiService.js      # AI service abstraction
│   └── ...
├── utils/               # Utility functions
│   ├── apiError.js       # Custom error classes
│   └── ...
├── .env.example         # Example environment variables
├── .eslintrc.js          # ESLint configuration
├── .gitignore
├── package.json
└── server.js             # Express app entry point
```

## Environment Configuration

The application uses different configurations based on the `NODE_ENV` environment variable:

- **development**: Enhanced debugging, detailed error messages, no caching
- **production**: Optimized for performance, error logging, and security

## Security

- Input validation and sanitization
- Rate limiting
- Helmet for secure HTTP headers
- XSS protection
- NoSQL injection prevention
- Parameter pollution protection
- CORS enabled with secure defaults

## Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

## Deployment

The application is ready to be deployed to any Node.js hosting platform (e.g., Heroku, AWS, GCP, Azure).

### Example: Deploying to Heroku

1. Install the Heroku CLI
2. Login to your Heroku account: `heroku login`
3. Create a new Heroku app: `heroku create your-app-name`
4. Set environment variables:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   # Set other environment variables as needed
   ```
5. Deploy your code:
   ```bash
   git push heroku main
   ```

## Monitoring

The application includes logging to `logs/` directory:

- `combined.log` - All logs
- `error.log` - Error logs only

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team at support@raahein.com.
