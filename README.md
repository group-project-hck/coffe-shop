[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=14281919&assignment_repo_type=AssignmentRepo)

# Individual Project Phase 2

# Coffe Shop

## Endpoints

List of Available Endpoints:

- `POST /login`
- `POST /google-login`
- `POST /register`
- `POST /products`
- `GET /products`
- `POST /products/payment/:id`
- `GET /products/:id`
- `PUT /products/:id`
- `DELETE /products/:id`
- `POST /category`
- `GET /category`
- `PUT /category/:id`
- `DELETE /category/:id`
- `GET /pub-product`
- `GET /pub-category`

---

### POST /login

#### Description

- Fitur yang bisa digunakan untuk user terdaftar

#### Response

_200 - OK_

- Body
  ```json
  {
  	"access_token": "<your access token>",
  	"username": "<your username>",
  	"email": "<your email>"
  }
  ```

_400 - Bad Request_

- Body

  ```json
  {
  	"msg": "Please insert your email"
  }
  ```

  OR

  ```json
  {
  	"msg": "Please insert your password"
  }
  ```

_401 - Unauthorized_

- Body

  ```json
  {
  	"msg": "Email or password is wrong"
  }
  ```

_404 - Not Found_

- Body

  ```json
  {
  	"msg": "Please register first"
  }
  ```

---

### POST /google-login

#### Description

- Fitur Social Media Sign in by Google account

#### Response

_200 - OK_

- Body
  ```json
  {
  	"access_token": "<your access token>",
  	"username": "<your username>",
  	"email": "<your email>"
  }
  ```

---

### POST /register

#### Description

- Fitur untuk menambahkan / registrasi User baru

#### Response

_201 - Created_

- Body

  ```json
  {
  	"msg": "Register <your username>, success"
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
  	"msg": "Username is required"
  }
  ```
  OR
  ````json
  {
  	"msg": "Email is required"
  }
  OR
  ```json
  {
  	"msg": "Password is required"
  }
  ````
  OR
  ```json
  {
  	"msg": "Email already exist"
  }
  ```

---

### POST /products

#### Description

- Fitur untuk menambahkan data product

#### Response

_201 - Created_

- Body

  ```json
  {
  	"msg": "Success added <your title>'s product"
  }
  ```

_400 - Bad Request_

- Body

  ```json
  {
  	"msg": "Title is required"
  }
  ```

  OR

  ```json
  {
  	"msg": "Description is required"
  }
  ```

  OR

  _Validation more_

_401 - Unauthorized_

- Body

  ```json
  {
  	"msg": "Please login first"
  }
  ```

  OR

  ```json
  {
  	"msg": "Invalid Token"
  }
  ```

---

### GET /products

#### Description

- Fitur untuk menampilkan semua data product

#### Response

_200 - OK_

- Body

  ```json
  [
    {
        "id": 20,
        "title": "Lemonad",
        "description": "Var känd i Paris först och blev sedan mycket populär i hela Europa. Denna söta, färglösa, kolsyrade dryck görs genom att blanda citronsaft och kolsyrat vatten.",
        "image": "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGVtb25hZGV8ZW58MHx8MHx8fDA%3D",
        "price": 10000,
        "UserId": 1,
        "CategoryId": 1,
        "Category": {
            "id": 1,
            "name": "iced"
        }
    },
    {
        "id": 19,
        "title": "Frozen Lemonade",
        "description": "Frozen lemonade är en uppfriskande sommardryck som kombinerar färskpressad citronsaft, is och sötning till en svalkande, syrlig och sötsyrlig smaksensation.",
        "image": "https://images.unsplash.com/photo-1523371054106-bbf80586c38c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxlbW9uYWRlJTIwd2l0aCUyMGljZXxlbnwwfHwwfHx8MA%3D%3D",
        "price": 10000,
        "UserId": 1,
        "CategoryId": 1,
        "Category": {
            "id": 1,
            "name": "iced"
        }
    },
    ...
  ]
  ```

_401 - Unauthorized_

- Body

  ```json
  {
  	"msg": "Please login first"
  }
  ```

  OR

  ```json
  {
  	"msg": "Invalid Token"
  }
  ```

---

### GET /products/payment/:id

#### Description

- Fitur untuk membuat transaksi pembayaran pada product yang dipilih

#### Response

_201 - Created_

- Body

  ```json
  {
  	"token": "<your token payment>",
  	"redirect_url": "<your link payment gateway>"
  }
  ```

---

### GET /products/:id

#### Description

- Fitur untuk menampilkan data product berdasarkan id product

#### Response

_200 - OK_

- Body

  ```json
  {
  	"id": 1,
  	"title": "Black Coffee",
  	"description": "Svart kaffe är så enkelt som det kan bli med malda kaffebönor dränkta i hett vatten, serverat varmt. Och om du vill låta fancy kan du kalla svart kaffe med sitt rätta namn: café noir.",
  	"image": "https://images.unsplash.com/photo-1494314671902-399b18174975?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  	"price": 10000,
  	"UserId": 1,
  	"CategoryId": 1,
  	"createdAt": "2024-03-16T10:24:43.650Z",
  	"updatedAt": "2024-03-16T10:24:43.650Z"
  }
  ```

  _401 - Unauthorized_

- Body

  ```json
  {
  	"msg": "Please login first"
  }
  ```

  OR

  ```json
  {
  	"msg": "Invalid Token"
  }
  ```

  _401 - Not found_

- Body

  ```json
  {
  	"msg": "Data not found"
  }
  ```

---

### PUT /products/:id

#### Description

- Fitur untuk merubah / update data product berdasarkan id product

#### Response

_200 - OK_

- Body

  ```json
  {
  	"msg": "Success updated <title>'s product"
  }
  ```

  _401 - Unauthorized_

- Body

  ```json
  {
  	"msg": "Please login first"
  }
  ```

  OR

  ```json
  {
  	"msg": "Invalid Token"
  }
  ```

  _401 - Not found_

- Body

  ```json
  {
  	"msg": "Data not found"
  }
  ```

---

### DELETE /products/:id

#### Description

- Fitur untuk menghapus / delete data product berdasarkan id product

#### Response

_200 - OK_

- Body

  ```json
  {
  	"msg": "<title>, has been deleted"
  }
  ```

  _401 - Unauthorized_

- Body

  ```json
  {
  	"msg": "Please login first"
  }
  ```

  OR

  ```json
  {
  	"msg": "Invalid Token"
  }
  ```

  _401 - Not found_

- Body

  ```json
  {
  	"msg": "Data not found"
  }
  ```

---

### POST /category

#### Description

- Fitur untuk menambahkan data category

#### Response

_201 - Created_

- Body

  ```json
  {
  	"msg": "Success added <name>'s category"
  }
  ```

_400 - Bad Request_

- Body

  ```json
  {
  	"msg": "Category name is required"
  }
  ```

_401 - Unauthorized_

- Body

  ```json
  {
  	"msg": "Please login first"
  }
  ```

  OR

  ```json
  {
  	"msg": "Invalid Token"
  }
  ```

---

### GET /category

#### Description

- Fitur untuk menampilkan semua data category

#### Response

_200 - Created_

- Body

  ```json
  [
  	{
  		"id": 1,
  		"name": "iced"
  	},
  	{
  		"id": 2,
  		"name": "hot"
  	},
    ...
  ]
  ```

_401 - Unauthorized_

- Body

  ```json
  {
  	"msg": "Please login first"
  }
  ```

  OR

  ```json
  {
  	"msg": "Invalid Token"
  }
  ```

---

### PUT /category/:id

#### Description

- Fitur untuk merubah / update data category

#### Response

_200 - Created_

- Body

  ```json
  {
  	"msg": "Success updated <name>'s category"
  }
  ```

_404 - Not found_

- Body

  ```json
  {
  	"msg": "Data not found"
  }
  ```

_401 - Unauthorized_

- Body

  ```json
  {
  	"msg": "Please login first"
  }
  ```

  OR

  ```json
  {
  	"msg": "Invalid Token"
  }
  ```

---

### DELETE /category/:id

#### Description

- Fitur untuk menghapus / delete data category

#### Response

_200 - Created_

- Body

  ```json
  {
  	"msg": "<name>, has been deleted"
  }
  ```

_404 - Not found_

- Body

  ```json
  {
  	"msg": "Data not found"
  }
  ```

_401 - Unauthorized_

- Body

  ```json
  {
  	"msg": "Please login first"
  }
  ```

  OR

  ```json
  {
  	"msg": "Invalid Token"
  }
  ```

---

### GET pub-product

#### Description

- Fitur untuk menampilkan semua data product (PUBLIC SITE)

#### Response

_200 - OK_

- Body

  ```json
  [
    {
        "id": 20,
        "title": "Lemonad",
        "description": "Var känd i Paris först och blev sedan mycket populär i hela Europa. Denna söta, färglösa, kolsyrade dryck görs genom att blanda citronsaft och kolsyrat vatten.",
        "image": "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGVtb25hZGV8ZW58MHx8MHx8fDA%3D",
        "price": 10000,
        "UserId": 1,
        "CategoryId": 1,
        "Category": {
            "id": 1,
            "name": "iced"
        }
    },
    {
        "id": 19,
        "title": "Frozen Lemonade",
        "description": "Frozen lemonade är en uppfriskande sommardryck som kombinerar färskpressad citronsaft, is och sötning till en svalkande, syrlig och sötsyrlig smaksensation.",
        "image": "https://images.unsplash.com/photo-1523371054106-bbf80586c38c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxlbW9uYWRlJTIwd2l0aCUyMGljZXxlbnwwfHwwfHx8MA%3D%3D",
        "price": 10000,
        "UserId": 1,
        "CategoryId": 1,
        "Category": {
            "id": 1,
            "name": "iced"
        }
    },
    ...
  ]
  ```

---

### GET /pub-category

#### Description

- Fitur untuk menampilkan semua data category (PUBLIC SITE)

#### Response

_200 - Created_

- Body

  ```json
  [
  	{
  		"id": 1,
  		"name": "iced"
  	},
  	{
  		"id": 2,
  		"name": "hot"
  	},
    ...
  ]
  ```

---

### Global Error

#### Response

_500 - Internal Server Error_

- Body
  ```json
  {
  	"message": "Internal server error"
  }
  ```
