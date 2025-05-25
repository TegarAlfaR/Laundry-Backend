# Express PostgreSQL Project

A web application built with Express.js and PostgreSQL database using Sequelize ORM.

## Prerequisites

Before running this application, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [PostgreSQL](https://www.postgresql.org/) (version 12 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

1. **Clone the repository**

   ```bash
   git clone <https://github.com/TegarAlfaR/Laundry-Backend.git>
   cd <LAUNDRY-BE>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   Create a `.env` file in the root directory and configure your database connection:

   ```env
   PORT=3000

   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=your_database_name
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   DB_DIALECT=postgres
   ```

4. **Database Setup**

   Make sure PostgreSQL is running on your system, then run the following commands:

   ```bash
   # Create the database
   npm run db:create

   # Run migrations to create tables
   npm run db:migrate

   # (Optional) Seed the database with initial data
   npm run db:seed
   ```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode using nodemon. The server will restart automatically when you make changes to the code.

### `npm run db:create`

Creates the database specified in your configuration.

### `npm run db:drop`

Drops the database (⚠️ This will delete all data).

### `npm run db:migrate`

Runs all pending migrations to update your database schema.

### `npm run db:migrate:undo`

Reverts the last migration.

### `npm run db:seed`

Seeds the database with initial data.

### `npm run db:seed:undo`

Reverts all seeders.

## Getting Started

1. Follow the installation steps above
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:3000` (or the port specified in your .env file)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Troubleshooting

### Database Connection Issues

- Make sure PostgreSQL is running
- Verify your database credentials in the `.env` file
- Check if the database exists (create it using `npm run db:create` if needed)

### Migration Issues

- Make sure all previous migrations have been run
- Check for syntax errors in migration files
- Verify database connection before running migrations
