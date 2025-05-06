# InMoment - Photography Platform

A modern photography platform built with Angular, Node.js, and AWS S3.

## Features

- Client Galleries
- Portfolio Websites
- Studio Management
- Online Store
- Mobile Gallery App

## Tech Stack

### Frontend
- Angular (Latest Version)
- Angular Material
- NgRx for state management
- SCSS for styling
- PWA support

### Backend
- Node.js
- Express.js/NestJS
- MongoDB/PostgreSQL
- JWT Authentication
- AWS SDK

### Storage
- AWS S3 for file storage
- CloudFront for CDN
- Image processing with Sharp

## Project Structure

```
inmoment/
├── src/
│   ├── frontend/           # Angular application
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── core/           # Core modules
│   │   │   │   ├── shared/         # Shared components
│   │   │   │   ├── features/       # Feature modules
│   │   │   │   └── layouts/        # Layout components
│   │   │   └── assets/
│   │   └── package.json
│   │
│   └── backend/           # Node.js application
│       ├── src/
│       │   ├── config/    # Configuration files
│       │   ├── controllers/
│       │   ├── models/
│       │   ├── routes/
│       │   ├── services/
│       │   └── utils/
│       └── package.json
│
├── .gitignore
├── README.md
└── docker-compose.yml
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Angular CLI
- MongoDB/PostgreSQL
- AWS Account with S3 access

### Frontend Setup
```bash
cd src/frontend
npm install
ng serve
```

### Backend Setup
```bash
cd src/backend
npm install
npm run dev
```

### Environment Variables
Create `.env` files in both frontend and backend directories:

Frontend (.env):
```
API_URL=http://localhost:3000
AWS_REGION=your-region
```

Backend (.env):
```
PORT=3000
MONGODB_URI=your-mongodb-uri
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_BUCKET_NAME=your-bucket-name
JWT_SECRET=your-jwt-secret
```

## Development

### Running Tests
```bash
# Frontend
cd src/frontend
npm run test

# Backend
cd src/backend
npm run test
```

### Building for Production
```bash
# Frontend
cd src/frontend
npm run build

# Backend
cd src/backend
npm run build
```

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
MIT
