# visteonusersv1

Visteonuserv1 – Users list Microservices


# This service is to register the user and send back the JWT token

curl --location --request POST 'http://localhost:3000/v1/api/visteon/user/register' \
--header 'x-auth-token;' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "dileep",
    "lastName": "kumar",
    "email": "dileep@12345.com",
    "password": "dileep",
    "phoneNumber": "8919889046"
}'


# This service is to get logged in user info based on JWT token passed in header

curl --location --request GET 'http://localhost:3000/v1/api/visteon/user/info' \
--header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlYmQ3ZDMwYjM1OGFmMmI2MTVlNWZmIiwiZmlyc3ROYW1lIjoiZGlsZWVwIiwibGFzdE5hbWUiOiJrdW1hciJ9LCJpYXQiOjE2NDI4NDYxNjMsImV4cCI6MTY0MzIwNjE2M30.TjcSOX8JvxPL1_h1PpTrppgTBfL8WkZQAJ1fsLzuYCk' \




# This service is to get the list of users in users list

curl --location --request GET 'http://localhost:3000/v1/api/visteon/user/list' \
--header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlYmQ3ZDMwYjM1OGFmMmI2MTVlNWZmIiwiZmlyc3ROYW1lIjoiZGlsZWVwIiwibGFzdE5hbWUiOiJrdW1hciJ9LCJpYXQiOjE2NDI4NDYxNjMsImV4cCI6MTY0MzIwNjE2M30.TjcSOX8JvxPL1_h1PpTrppgTBfL8WkZQAJ1fsLzuYCk' \


# This service is to update details of User

curl --location --request PUT 'http://localhost:3000/v1/api/visteon/user' \
--header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlYmQ3ZDMwYjM1OGFmMmI2MTVlNWZmIiwiZmlyc3ROYW1lIjoiZGlsZWVwIiwibGFzdE5hbWUiOiJrdW1hciJ9LCJpYXQiOjE2NDI4NDYxNjMsImV4cCI6MTY0MzIwNjE2M30.TjcSOX8JvxPL1_h1PpTrppgTBfL8WkZQAJ1fsLzuYCk' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "xyz",
    "lastName": "abc"
}'

![image](https://user-images.githubusercontent.com/98578797/151507551-9b8f5089-9800-4ef5-9e2e-204637032b50.png)
