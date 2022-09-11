
<img src="https://i.ibb.co/bQXcP2V/mysql.png" width="300"><br/><br/>


**File-API**


The purpose of this app is to build a CRUD API on Express.js, that stores files in MySql database in binary format. The app is containerized with Docker Compose.

The script is relatively straightforward and organized with self-explanatory file names and folders. To run it, just unzip the file and run the following:

`
npm install
docker-compose up
`

The _logic of the endpoints_ and some clarification what they do:

1) **POST** endpoint: `/signup`

- registers new user, using email is `id`, returns JWT token:

`
curl --location --request POST 'http://localhost:11000/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": "test1@mail.com",
    "password": "test1"
}'
`

2) **POST** endpoint: `/signin`

- retrives Bearer `access_token` and `refresh_token` when the former expires

`
curl --location --request POST 'http://localhost:11000/signin' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": "test1@mail.com",
    "password": "test1"
}'
`

3) **POST** endpoint: `/signin/new_token`

- updates `access_token`:

`
curl --location --request POST 'http://localhost:11000/signin/new_token' \
--header 'Content-Type: application/json' \
--data-raw '{
    "refreshtoken": "c74baf9d-701b-4868-8b3f-7d57cfe76a75"
}'
`

4) **POST** endpoint: `/file/upload`

- adds new file in file system and stores in db as binary file:

`
curl --location --request POST 'http://localhost:11000/file/upload' \
--header 'Content-Type: multipart/form-data' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QxQG1haWwuY29tIiwiaWF0IjoxNjYyOTA3MjQzLCJleHAiOjE2NjI5MDc4NDN9.64yPG3ofe1lC_OO0hVt-WH2nnUJS6mI8J2e8PRtGJ-U' \
--form 'sample=@"/home/bak/Documents/SCRIPT/ERPAero/uploads/test.txt"'
`

5) **GET** endpoint: `/file/single/:id`

- retrives metadata about file:

`
curl --location --request GET 'http://localhost:11000/file/single/1'
`

6) **GET** endpoint: `/file/list`

- paginated query of files, expeceting nullable `list_size=10` and `page=1`:

`
curl --location --request GET 'http://localhost:11000/file/list' \
--header 'Content-Type: text/plain' \
--data-raw '{
    "page" : 1
}'
`

7) **DELETE** endpoint: `/file/delete/:id`

- hard delete specific file (and table row) by `id`:

`
curl --location --request DELETE 'http://localhost:11000/file/delete/1'
`

8) **DELETE** endpoint: `/file/delete/:id`

- hard delete specific file (and table row) by `id`:

`
curl --location --request DELETE 'http://localhost:11000/file/delete/1'
`

9) **GET** endpoint: `/file/download/:id`

- downloads specific file `id`:

`
curl --location --request POST 'http://localhost:11000/file/download/1'
`

10) **GET** endpoint: `/file/update/:id`

- replaces a file with new one by `id`:

`
curl --location --request PUT 'http://localhost:11000/file/update/1' \
--header 'Content-Type: multipart/form-data' \
--header 'Authorization: Bearer <your-token>' \
--form 'sample=@"/home/bak/Documents/SCRIPT/ERPAero/uploads/test.txt"'
`

11) **GET** endpoint: `/info`

- retrives user's `id`:

`
curl --location --request GET 'http://localhost:11000/info' \
--header 'Authorization: Bearer <your-token>'
`


12) **GET** endpoint: `/logout`

- returns new `access_token`, invalidating the previous one:

`
curl --location --request GET 'http://localhost:11000/logout' \
--header 'Authorization: Bearer <your-token>'
`