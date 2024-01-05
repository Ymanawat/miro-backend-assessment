

### Installation

To get started, clone or download the NestJS application from the repository. Once you've got the code locally, navigate to the project directory in your terminal and run:

```bash
npm install
```

This command installs all the necessary dependencies for the NestJS application.

### Starting the App

After installing the dependencies, you can start the application by running:

```bash
npm run start
```

### Routes and Usage

Your NestJS application has two main routes for `user` registration and authentication:

1. **Signup Route** (`POST /api/auth/signup`): This route registers a new user.
2. **Login Route** (`POST /api/auth/login`): This route allows users to log in.

#### Signup

To create a new user, you'll send a `POST` request to `/api/auth/signup` with the required user information (e.g., `firstName`, `lastName`, `email`, `password`). The request body should adhere to the `NewUserDto` structure defined in `user.dto`.
#### Signup Request:

```bash
curl -X POST http://localhost:3000/api/auth/signup -H "Content-Type: application/json" -d '{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "mysecretpassword"
}'
```

#### Response
```
{
    "success": true/false,
    "message": "Signup success"
}
```

#### Login

For user login, send a `POST` request to `/api/auth/login` with the user's `email` and `password` in the request body (following the structure defined in `LoginPayload`). Upon successful login, the route responds with a `LoginResponseDto` containing a `bearer_token`.

#### Login Request:

```bash
curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d '{
  "email": "john@example.com",
  "password": "mysecretpassword"
}'
```
#### Response
```
{
  success: true,
  message: 'Login success',
  bearer_token: token,
}
```


### Notes

### Create a Note

To create a new note, send a `POST` request to `/api/notes` with the required note information (e.g., `title`, `content`). The request body should adhere to the `NotesDto` structure defined in `note.dto`.

#### Create Note Request:

```bash
curl -X POST http://localhost:3000/api/notes \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <bearer_token>" \
-d '{
  "title": "New Note Title",
  "content": "This is the content of the note"
}'
```

#### Create Note Response
```json
{
  "data": {
    "_id": "6595a3e3311e84e63b5cc236",
    "title": "New Note Title",
    "content": "This is the content of the note",
    "adminUserIds": ["userId"],
    "createdAt": "2024-01-03T18:13:55.101Z",
    "updatedAt": "2024-01-03T18:13:55.101Z"
  }
}
```

### Update a Note

To update an existing note, send a `PUT` request to `/api/notes/:id` with the note ID as a route parameter and the updated note information in the request body. The request body should adhere to the `NotesDto` structure defined in `note.dto`.

#### Update Note Request:

```bash
curl -X PUT http://localhost:3000/api/notes/:id \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <bearer_token>" \
-d '{
  "title": "Updated Note Title",
  "content": "This is the updated content of the note"
}'
```

#### Update Note Response
```json
{
  "data": {
    "_id": "6595a3e3311e84e63b5cc236",
    "title": "Updated Note Title",
    "content": "This is the updated content of the note",
    "adminUserIds": ["userId"],
    "createdAt": "2024-01-03T18:13:55.101Z",
    "updatedAt": "2024-01-04T08:00:00.000Z"
  }
}
```

### Get a Note

To retrieve a specific note, send a `GET` request to `/api/notes/:id` with the note ID as a route parameter. This endpoint requires authorization.

#### Get Note Request:

```bash
curl -X GET http://localhost:3000/api/notes/:id \
-H "Authorization: Bearer <bearer_token>"
```

#### Get Note Response
```json
{
  "data": {
    "_id": "6595a3e3311e84e63b5cc236",
    "title": "Note Title",
    "content": "This is the content of the note",
    "adminUserIds": ["userId"],
    "createdAt": "2024-01-03T18:13:55.101Z",
    "updatedAt": "2024-01-03T18:13:55.101Z"
  }
}
```

### Get All Notes

To retrieve all notes, send a `GET` request to `/api/notes`. This endpoint requires authorization.

#### Get All Notes Request:

```bash
curl -X GET http://localhost:3000/api/notes \
-H "Authorization: Bearer <bearer_token>"
```

#### Get All Notes Response
```json
{
  "data": [
    {
      "_id": "6595a3e3311e84e63b5cc236",
      "title": "Note Title 1",
      "content": "This is the content of note 1",
      "adminUserIds": ["userId"],
      "createdAt": "2024-01-03T18:13:55.101Z",
      "updatedAt": "2024-01-03T18:13:55.101Z"
    },
    {
      "_id": "7595a3e3311e84e63b5cc237",
      "title": "Note Title 2",
      "content": "This is the content of note 2",
      "adminUserIds": ["userId"],
      "createdAt": "2024-01-04T10:00:00.000Z",
      "updatedAt": "2024-01-04T10:00:00.000Z"
    }
  ]
}
```

### Delete a Note

To delete a specific note, send a `DELETE` request to `/api/notes/:id` with the note ID as a route parameter. This endpoint requires authorization.

#### Delete Note Request:

```bash
curl -X DELETE http://localhost:3000/api/notes/:id \
-H "Authorization: Bearer <bearer_token>"
```

#### Delete Note Response
```json
{
  "success": true
}
```

### Share a Note

To share a specific note, send a `POST` request to `/api/notes/:id/share` with the note ID as a route parameter. This endpoint generates a sharing URL for the note. This endpoint requires authorization.

#### Share Note Request:

```bash
curl -X POST http://localhost:3000/api/notes/:id/share \
-H "Authorization: Bearer <bearer_token>"
```

#### Share Note Response
```json
{
  "sharingUrl": "https://localhost:3000/api/notes/:id/share"
}
```

### Get Shared Note

To access a shared note via a sharing URL, send a `GET` request to `/api/notes/:id/share`. This endpoint allows access to the shared note if the token is valid.

#### Get Shared Note Request:

```bash
curl -X GET http://localhost:3000/api/notes/:id/share?token=<share_token>
```

#### Get Shared Note Response
```json
{
  "data": {
    "_id": "6595a3e3311e84e63b5cc236",
    "title": "Shared Note Title",
    "content": "Content of the shared note",
    "adminUserIds": ["sharedUserId"],
    "createdAt": "2024-01-03T18:13:55.101Z",
    "updatedAt": "2024-01-03T18:13:55.101Z"
  }
}
```
