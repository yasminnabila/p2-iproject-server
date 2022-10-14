# API Documentation

## List of available endpoints:

### SESSION

- `POST /register`
- `POST /login`
- `POST /payments`

### API

- `GET /get-albums`

&nbsp;

# SESSION

## 1. POST /register

### Description:

- Register an account for new user

### Required information:

- Request body:

```json
  {
    "username": String,
    "email": String,
    "password": String,
  }
```

### Response code:

Succeed: _201 - Created_

```json
{
    "statusCode": 201,
    "message": "User created successfully",
    "id": Integer,
    "email": String
}
```

Error: _400 - Bad Request_ (If required information is incomplete)

```json
{
  "message": "<Error message(s) from server>"
}
```

## 2. POST /login

### Description:

- Gain access to the website for user

### Required information:

-Request headers:

```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

- Request body:

  ```json
  {
    "email": String,
    "password": String
  }
  ```

### Response code:

Succeed: _200 - OK_

```json
{
  "statusCode": 200,
  "message": String,
  "access_token": String,
}
```

Error: _400 - Bad Request_ (If required information is incomplete)

```json
{
  "message": "<Error message(s) from server>"
}
```

Error: _401 - Unauthorized_ (If the request body is not filled as intended)

```json
{
  "message": "Email/ password cannot be empty"
}
```

Error: _401 - Unauthorized_ (If the required information is not found)

```json
{
  "message": "Invalid email/ password"
}
```

Error: _401 - Unauthorized_ (If the request returns no access token)

```json
{
  "message": "No token is received"
}
```

Error: _401 - Unauthorized_ (If the request returns an invalid token)

```json
{
  "message": "Invalid token"
}
```

## 3. POST /payments

### Description:

- Create a premium account for user

### Required information:

- Request headers:

```json
{
  "access_token": String
}
```

### Response code:

Succeed: _201 - Created_

```json
{
  "transactionToken": String
}
```

&nbsp;

# API

## 1. GET /get-album

### Description:

- Fetch Spotify catalog information for a single album

### Required information:

- Request headers:

```json
{
  "access_token": String
}
```

### Response code:

Succeed: _(200 - OK)_

```json
{
  "album_type": String,
  "total_tracks": Integer,
  "available_markets": [String, String, String, ...],
  "external_urls": {
    "spotify": String,
  },
  "href": String,
  "id": String,
  "images": [
    {
      "url": String,
      "height": Integer,
      "width": Integer
    }
  ],
  "name": String,
  "release_date": String,
  "release_date_precision": String,
  "restrictions": {
    "reason": String,
  },
  "type": String,
  "uri": String,
  "artists": [
    {
      "external_urls": {
        "spotify": String,
      },
      "followers": {
        "href": String,,
        "total": 0
      },
      "genres": [String, String, String, ...],
      "href": String,,
      "id": String,,
      "images": [
        {
          "url": String,
          "height": Integer,
          "width": Integer
        }
      ],
      "name": String,
      "popularity": Integer,
      "type": String,
      "uri": String,
    }
  ],
  "tracks": {
    "href": String,
    "items": [{}],
    "limit": Integer,
    "next": String,
    "offset": Integer,
    "previous": String,
    "total": Integer
  }
}
```

&nbsp;

# Authentication Error

## Response:

Error: _401 - Unauthorized_ (If access token is not registered for access)

```json
{
  "message": "User not found"
}
```

&nbsp;

# Global Error

## Response:

Error: _500 - Internal Server Error_

```json
{
  "message": "Internal Server Error"
}
```