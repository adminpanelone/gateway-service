# gateway-service

```
curl -v -X POST http://{hostname}/api/login \
   -H 'Content-Type: application/json' \
   -d '{"email":"admin@adminpanel.localhost","password":"p@ssword", "firstName": "Administrator", "lastName": "Administrator"}'
```

```
curl -X GET -H 'Accept: application/json' -H "Authorization: Bearer ${TOKEN}" http://{hostname}/api/users

curl -X GET -H 'Accept: application/json' -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOnsiaWQiOjIsImVtYWlsIjoiYWRtaW5AYWRtaW5wYW5lbC5sb2NhbGhvc3QifSwiaWF0IjoxNjczNTQ2NzUwLCJleHAiOjE2NzM1NDczNTB9.XSVWoxjZeYuOdqLIlhJ6F42IhrX_UsSV7H2jqhHq-bU" http://localhost/api/users
```