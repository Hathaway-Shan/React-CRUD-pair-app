# React CRUD from Scratch planning artifacts

## Link to Miro Board

[https://miro.com/app/board/uXjVPQNKv9c=/]

## Routes

### 1. /auth

- users can sign in
- users can sign up
- redirects to pets list page

### 2. /pets

- displays a list of all pets created by all users
- should have a button to direct users to add pet form
- clicking add link should redirect to edit route
- if a user created a pet they should see a link to edit pet form
- clicking edit link should direct to edit route

### 3. /pet/new

- from add pet form users can create a new pet with the properties  
  'Name', 'Species', 'Description'.
- adding a pet redirects to /pets route to display all pets

### 4. /pet/edit/:id

- users can click the edit link from the /pets page to edit the  
  'Name', 'Species', and 'Description' properties of their pets
- the correct pet is fetched via a get by id function in the services layer
- edit form also has a delete button that allows users to delete their pet
- editing or deleting your pet redirects to /pets pet list page
