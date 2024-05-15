1) Need to run below command
### npm install

2) First register cusotmer 
    url: "api/auth/register"
    method: post
    data: {
    name:  {
    type: String,
            requried: true
        }
        email: {
            type: String,
            requried: true
        }
        password: {
            type: String,
            requried: true,
            lenth: > 8,
            include: special character, upper case ,lower case
        }
        phonenumber: {
            type: digit,
            requried: true,
        }
        profile: {
            type: 'png/jpeg/jpg'
            requried: optional
        }
        gender: {
            type: 'enum',
            option: { 'M', 'F', 'O'}
        }
        address: {
            type: 'string'
            requried: optional
            length: <= 255
        }
    }
    
3) Login user
    url: "api/auth/login"
    method: post
    data: {
        email: {
            type: String,
            requried: true
        }
         password:  {
            type: String,
            requried: true
        }
    }

4) Add customer using authentication
    url: "/api/customers"
    method: post,
    token: required,
    data: {
        name:  {
            type: String,
            requried: true
        }
        email: {
            type: String,
            requried: true
        }
        password: {
            type: String,
            requried: true,
            lenth: > 8,
            include: special character, upper case ,lower case
        }
        phonenumber: {
            type: digit,
            requried: true,
        }
        profile: {
            type: 'png/jpeg/jpg'
            requried: optional
        }
        gender: {
            type: 'enum',
            option: { 'M', 'F', 'O'}
        }
        address: {
            type: 'string'
            requried: optional
            length: <= 255
        }
    }

5) get cusotmers
    url: "/api/customers"
    method: get,
    token: required,

6) get specific cusotmers
    url: "/api/customers/id"
    method: get,
    token: required,

7) update specific cusotmers
    url: "/api/customers/id"
    method: PUT,
    token: required,
    data: {
        name:  {
            type: String,
            requried: true
        }
        email: {
            type: String,
            requried: true
        }
        password: {
            type: String,
            requried: true,
            lenth: > 8,
            include: special character, upper case ,lower case
        }
        phonenumber: {
            type: digit,
            requried: true,
        }
        profile: {
            type: 'png/jpeg/jpg'
            requried: optional
        }
        gender: {
            type: 'enum',
            option: { 'M', 'F', 'O'}
        }
        address: {
            type: 'string'
            requried: optional
            length: <= 255
        }
    }

8) Delete specific cusotmer
    url: "/api/customers/id"
    method: DELETE,
    token: required,
