# Endpoint Specification

# Register
## POST /register
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
### Response
On success:
{
  "message": "Registration successful",
  "token" : "gduykcFQK8T7GCLILigue87LIVWCYCAWCL"
}

On error:

{
  "error": "Email is already in use"
}
# Login

## POST /login
{
  "email": "user@example.com",
  "password": "userpassword"
}
### Response
200 Response

{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9ytyuduf",
}

401 Response 
{
  "error": "Invalid email or password."
}

# Forget Password
## POST /Forgotpassword
Method: POST
{
  "email": "user@example.com"
}
### Response
200 Response 

{
  "message": "A link to reset your password has been sent to your email."
}

400 Response
{
  "error": "No account associated with this email."
}

# Password Reset 

## Endpoint URL: /reset-password
Method: POST
{
  "password": "newPassword123",
  "token": "YOUR_RESET_TOKEN"
}

### Resposes
200 Response 
{
  "message": "Password has been successfully reset."
}

400 Response
{
  "error": "Invalid or expired reset token."
}

# Get User By Token 

## Post  : /user/{yrgfgusurog8gweo7gf9 9c9poggfg78fcgo8fg}

### Response
{
  "fullName": "John Doe",
  "email": "john.doe@example.com"
}

# Update 
## PATCH /update
{
  "fullName": "John Doe",
  "email": "john.doe@example.com"
}
### Response
On success:
{
  "message": "Successful",
}

On error:

{
  "error": "Error in update Account"
}

# Address should be a table extension from the User Table
#  Add Address

## POST /api/addresses

Request Body:

{
  "addressLine1": "123 Main St",
  "city": "Sample City",
  "state": "CA",
  "phone": "123-456-7890",
  "isDefault": false
}

### Response:

On success:

{
  "id": 1,
  "addressLine1": "123 Main St",
  "city": "Sample City",
  "state": "CA",
  "phone": "123-456-7890",
  "isDefault": false
}

On error:

{
  "error": "Error creating address"
}

# Get All Addresses

## GET /api/addresses

### Response:

On success:

[
  {
    "id": 1,
    "addressLine1": "123 Main St",
    "city": "Sample City",
    "state": "CA",
    "phone": "123-456-7890",
    "isDefault": false
  },
  {
    "id": 2,
    "addressLine1": "456 Another St",
    "city": "Another City",
    "state": "NY",
    "phone": "987-654-3210",
    "isDefault": true
  }
]

On error:

{
  "error": "Error fetching addresses"
}

# Get Address by ID

## GET /api/addresses/{id}

### Response:

On success:

{
  "id": 1,
  "addressLine1": "123 Main St",
  "city": "Sample City",
  "state": "CA",
  "phone": "123-456-7890",
  "isDefault": false
}

On error:

{
  "error": "Address not found"
}

# Update Address

## PUT /api/addresses/{id}

Request Body:

{
  "addressLine1": "456 Updated St",
  "city": "Updated City",
  "state": "TX",
  "phone": "321-654-0987",
  "isDefault": true
}

### Response:

On success:

{
  "id": 1,
  "addressLine1": "456 Updated St",
  "city": "Updated City",
  "state": "TX",
  "phone": "321-654-0987",
  "isDefault": true
}

On error:

{
  "error": "Error updating address"
}

# Delete Address

## DELETE /api/addresses/{id}

### Response:

On success:

{
  "message": "Address deleted successfully"
}

On error:

{
  "error": "Address not found"
}

# Set Default Address

## POST /api/addresses/{id}/setDefault

### Response:

On success:

{
  "message": "Address set as default successfully"
}

On error:

{
  "error": "Error setting default address"
}
