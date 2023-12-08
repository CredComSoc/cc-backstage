const FormData = require('form-data')
const EXPRESS_URL = "http://localhost:3000"

export async function register(isadmin, username, password, description, address, city, billingName, billingBox, billingAddress, orgNumber, email, phone) {
  const data = new FormData()
  data.append('accountInfo', JSON.stringify({
    is_admin: isadmin,
    accountName: username,
    password: password,
    description: description,
    address: address,
    city: city,
    billingName: billingName,
    billingBox: billingBox,
    billingAddress: billingAddress,
    orgNumber: orgNumber,
    email: email.toLowerCase(),
    phone: phone,
    min_limit: 1555,
    max_limit: 1555
  }))
  //data.append('file', logo)
  console.log(data)
  return await fetch('/api' + '/register', {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then((response) => {
      return response
    })
}

export async function login(email, password) { // The same login function as on sb.web.app. Stores a cookie when login successful
  return await fetch(EXPRESS_URL + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email, password: password }),
    credentials: 'include'
  }).then((response) => {
    if (!response.ok) {
      return false
    } else {
      return true
    }
  }).catch(() => {
    return false
  })
}


export async function authenticate() { //Checks if the cookie is valid and the user is still logged in
  return fetch(EXPRESS_URL + '/authenticate', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then((response) => {

    return response.json()
  }).catch(() => {

    return false
  })
}

export async function getuser() { //Checks if the cookie is valid and the user is still logged in
  return fetch(EXPRESS_URL + '/profile', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then((response) => {

    return response.json()
  }).catch(() => {

    return false
  })
}

export async function checkAdminStatus() {
  return fetch(EXPRESS_URL + '/admin', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then((response) => {
    return response.json()
  }).catch(() => {
    return false
  })
}
<<<<<<< HEAD
=======

export async function getCurrentProfile () {
  return fetch(EXPRESS_URL + '/profile', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then((response) => {
    return response.json()
  }).catch(() => {
    return false
  })
}
>>>>>>> graphql
