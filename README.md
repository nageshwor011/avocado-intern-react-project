# React CRUD application

Here I have used users api to perform my CRUD operation
By default users api have 10 user data. While inserting data in users api, it gives all the data what we inserted as a response along with id 11 if it successfully inserted. Here the main thing is during the get method api will not give user id 11's data even if we inserted previously.


## for the delete method
if successfully users data deleted it gives status code 200 as result if some thing error happen then it will through error so basically i have used status code 200 to 
become sure that particular user id is deleted.

### to updated
when users data updated api response gives status code 200 and json data what we have send for updating.

