Pokémon API
This is the backend for the Pokémon app, providing authentication and Pokémon data using the PokeAPI. It supports both online and offline capabilities with local storage for data persistence.

Features
Authentication: Sign-up, sign-in, sign-out functionalities.
Pokémon Data: Fetch Pokémon data from PokeAPI.
Custom Pokémon Entries: CRUD operations for user-defined Pokémon entries.
Offline Support: Data persistence using browser storage.
Setup
Clone the repository:
bash
Copy code
git clone <your-repo-url>
cd my-pokedex-app/api
Install dependencies:
bash
Copy code
npm install
Start the server:
bash
Copy code
npm run start
The server will run on http://localhost:5000.

API Endpoints
Authentication
Sign Up: POST /auth/signup

Request Body: { "username": "string", "password": "string" }
Response: { "message": "User created successfully" }
Sign In: POST /auth/signin

Request Body: { "username": "string", "password": "string" }
Response: { "token": "string" }
Sign Out: POST /auth/signout

Request Body: { "token": "string" }
Response: { "message": "User signed out successfully" }
Pokémon
Get Pokémon by ID: GET /pokemon/:id

Response: { "id": "number", "name": "string", "height": "number", "weight": "number" }
List Pokémon: GET /pokemon

Query Params: limit=number, offset=number
Response: [ { "id": "number", "name": "string", "height": "number", "weight": "number" } ]
Search Pokémon: GET /pokemon/search

Query Params: query=string
Response: [ { "id": "number", "name": "string", "height": "number", "weight": "number" } ]
Custom Pokémon
Create Custom Pokémon: POST /custom-pokemon

Request Body: { "name": "string", "height": "number", "weight": "number", "userId": "string" }
Response: { "id": "string", "name": "string", "height": "number", "weight": "number", "userId": "string" }
Get Custom Pokémon by ID: GET /custom-pokemon/:id

Response: { "id": "string", "name": "string", "height": "number", "weight": "number", "userId": "string" }
Update Custom Pokémon: PUT /custom-pokemon/:id

Request Body: { "name": "string", "height": "number", "weight": "number" }
Response: { "id": "string", "name": "string", "height": "number", "weight": "number", "userId": "string" }
Delete Custom Pokémon: DELETE /custom-pokemon/:id

Response: { "message": "Custom Pokémon deleted" }
List Custom Pokémon for User: GET /custom-pokemon/user/:userId

Response: [ { "id": "string", "name": "string", "height": "number", "weight": "number", "userId": "string" } ]
Offline Support
Data is cached using IndexedDB via localforage to ensure offline functionality. When offline, the app will read from the local storage instead of making network requests.

Monorepo Structure
The project is organized as a monorepo with the following structure:

perl
Copy code
my-pokedex-app/
├── api/ # Backend code
└── ui/ # Frontend code
Ensure that both backend and frontend can be started independently.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
For any questions or feedback, please contact [your-email@example.com].
