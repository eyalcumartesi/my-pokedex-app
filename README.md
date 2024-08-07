# Pokédex App

## Overview

Welcome to the Pokédex App! This application allows users to manage their own collection of Pokémon. Users can search for Pokémon, view details, mark favorites, create custom entries, and edit or delete existing entries. The app also includes authentication, offline functionality, and deployment capabilities.

## Features

- **CRUD Operations**: Create, read, update, and delete Pokémon entries.
- **Search and Filter**: Search for Pokémon by name and filter by type.
- **Pagination**: Navigate through the list of saved Pokémon with pagination.
- **Authentication**: Secure user authentication with sign-up, sign-in, and sign-out functionalities.
- **Offline Functionality**: The app remains functional even when offline.
- **Deployment**: The app is deployed to a production environment.

## Tech Stack

- **Frontend**: Ionic (React)
- **Styling**: PandaCSS
- **Data Management**: React Query
- **Backend**: Node.js with Express
- **Database**: SQLite (in-memory)
- **Storage**: Browser storage for data persistence
- **Programming Language**: TypeScript

## Project Structure

```
/my-pokedex-app
├── /api (backend)
├── /ui (frontend)
└── README.md
```

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/my-pokedex-app.git
cd my-pokedex-app
```

2. **Install dependencies for both frontend and backend:**

```bash
# Install backend dependencies
cd api
npm install

# Install frontend dependencies
cd ../ui
npm install
```

### Environment Variables

Create a `.env` file in the `api` directory and add the following environment variables:

```
JWT_SECRET=your_jwt_secret
PORT=5050
```

### Running the Application

1. **Start the backend server:**

```bash
cd api
npm run start
```

2. **Start the frontend application:**

```bash
cd ../ui
npm run start
```

The application should now be running on `http://localhost:3000`.

## Usage

### Authentication

1. **Sign Up**: Create a new account.
2. **Sign In**: Log in to your account.
3. **Sign Out**: Log out from your account.

### Pokémon Management

1. **Generate Random Pokémon**: Navigate to the "Generate" tab and click the "Generate Random Pokémon" button to fetch a random Pokémon.
2. **Save Pokémon**: Click the "Save Pokémon" button to save the generated Pokémon to your collection.
3. **View Saved Pokémon**: Navigate to the "Saved Pokémon" tab to view your saved Pokémon.
4. **Edit Pokémon**: Click the "Edit" button on a Pokémon card to update its details.
5. **Delete Pokémon**: Click the "Delete" button on a Pokémon card to remove it from your collection.

### Search and Filter

- Use the search bar to find Pokémon by name.
- Use the filter dropdown to filter Pokémon by type.
- Use the pagination controls to navigate through pages of saved Pokémon.

## API Endpoints

### Authentication

- **POST /auth/signup**: Register a new user.
- **POST /auth/signin**: Log in a user.
- **POST /auth/signout**: Log out a user.
- **POST /auth/verify-2fa**: Verify 2FA code.

### Pokémon

- **GET /pokemon/random**: Get a random Pokémon.
- **GET /pokemon/save**: Get saved Pokémon for a user.
- **POST /pokemon/save**: Save a Pokémon for a user.
- **PUT /pokemon/update**: Update a saved Pokémon for a user.
- **DELETE /pokemon/:id**: Delete a saved Pokémon for a user.

## Deployment

The app is deployed to a production environment. Access it via the following URL:

[Production URL](http://your-production-url.com)

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Happy Pokémon catching!
```

### Notes

- Ensure to replace placeholders like `https://github.com/your-username/my-pokedex-app.git` and `http://your-production-url.com` with actual values.
- Update the license information if necessary.
