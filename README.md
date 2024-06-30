Start the backend: \
admin> docker-compose up \

main> docker-compose up

Endpoints to test for the Backend: \
GET 127.0.0.1:8000/api/products : returns the list of all the products from the `products` table \
POST 127.0.0.1:8000/api/products : adds the data from the payload to `products` table \
GET 127.0.0.1:8000/api/user : returns a random userId \
POST 127.0.0.1:8001/api/products/<id>/like : likes the product of id=<id>. This changes are reflected in the backend. 
