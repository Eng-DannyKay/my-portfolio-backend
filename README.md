# Portfolio Backend API

A robust and scalable RESTful API built with Node.js, Express, and TypeScript for managing portfolio contact form submissions. This backend service handles contact inquiries with proper validation, logging, and database persistence using TypeORM and PostgreSQL.

## 🚀 Features

- **Contact Form API**: RESTful endpoints for handling contact form submissions
- **TypeScript**: Full type safety and modern JavaScript features
- **TypeORM**: Elegant database management with entity-based architecture
- **PostgreSQL**: Reliable and powerful database for data persistence
- **Validation**: Request validation using class-validator and class-transformer
- **CORS**: Configured for secure cross-origin requests
- **Logging**: Integrated logging with Pino for monitoring and debugging
- **Clean Architecture**: Organized with controllers, services, repositories, and entities

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Eng-DannyKay/my-portfolio-backend.git
   cd my-portfolio-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   DB_HOST=localhost
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=portfolio_db
   DB_PORT=5432
   ```

4. **Set up the database**
   
   Create a PostgreSQL database:
   ```bash
   createdb portfolio_db
   ```

## 🎯 Usage

### Development Mode

Run the application in development mode with hot-reload:

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### Production Build

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Endpoints

#### Submit Contact Form
- **POST** `/api/v1/contact`
- **Description**: Submit a new contact form inquiry
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "subject": "Project Inquiry",
    "message": "I would like to discuss a project with you."
  }
  ```
- **Response**: `201 Created`
  ```json
  {
    "id": "uuid",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "subject": "Project Inquiry",
    "message": "I would like to discuss a project with you.",
    "createdAt": "2025-12-17T10:00:00.000Z",
    "updatedAt": "2025-12-17T10:00:00.000Z"
  }
  ```

#### Health Check
- **GET** `/`
- **Description**: Check if the server is running
- **Response**: `200 OK`
  ```
  Hello World!
  ```

## 🏗️ Project Structure

```
my-portfolio-backend/
├── src/
│   ├── config/           # Configuration files
│   │   ├── data-source.ts    # TypeORM database configuration
│   │   └── env.ts            # Environment variables handler
│   ├── controllers/      # Request handlers
│   │   └── contactController.ts
│   ├── dtos/            # Data Transfer Objects
│   │   └── contact.dto.ts
│   ├── entities/        # TypeORM entities
│   │   └── contact.entity.ts
│   ├── middlewares/     # Express middlewares
│   │   └── http-logger.middleware.ts
│   ├── repository/      # Data access layer
│   │   └── contact.repository.ts
│   ├── routes/          # API routes
│   │   └── contact.routes.ts
│   ├── services/        # Business logic
│   │   └── contact.service.ts
│   ├── utils/           # Utility functions
│   │   └── logger.ts
│   └── index.ts         # Application entry point
├── .env                 # Environment variables (create this)
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md           # Project documentation
```

## 🔧 Technologies Used

- **[Node.js](https://nodejs.org/)** - Runtime environment
- **[Express](https://expressjs.com/)** - Web framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[TypeORM](https://typeorm.io/)** - ORM for database management
- **[PostgreSQL](https://www.postgresql.org/)** - Relational database
- **[class-validator](https://github.com/typestack/class-validator)** - Validation decorators
- **[class-transformer](https://github.com/typestack/class-transformer)** - Object transformation
- **[Pino](https://getpino.io/)** - Fast logging library
- **[CORS](https://github.com/expressjs/cors)** - Cross-origin resource sharing
- **[dotenv](https://github.com/motdotla/dotenv)** - Environment variable management

## 🧪 Available Scripts

- `npm run dev` - Run the application in development mode with hot-reload
- `npm run build` - Build the TypeScript code for production
- `npm start` - Start the production server
- `npm test` - Run tests (to be implemented)

## 🔐 Environment Variables

| Variable      | Description                    | Default   |
|---------------|--------------------------------|-----------|
| `DB_HOST`     | PostgreSQL host address        | -         |
| `DB_USER`     | Database username              | -         |
| `DB_PASSWORD` | Database password              | -         |
| `DB_NAME`     | Database name                  | -         |
| `DB_PORT`     | PostgreSQL port                | 5432      |

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is [ISC](https://opensource.org/licenses/ISC) licensed.

## 👤 Author

**Eng-DannyKay**

- GitHub: [@Eng-DannyKay](https://github.com/Eng-DannyKay)

## 🙏 Acknowledgments

- Built with modern Node.js best practices
- Follows clean architecture principles
- Designed for scalability and maintainability

---

⭐️ If you find this project useful, please consider giving it a star!