const FormData = require('form-data')
const EXPRESS_URL = "http://localhost:3000"

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

export async function getCurrentUser() {
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


export async function updateUserProfile(previousname, accountName, description, address, city, billingName, billingBox, billingAddress, orgNumber, email, phone, logo) {
  const data = new FormData()
  data.append('accountInfo', JSON.stringify({
    accountName: accountName,
    description: description,
    address: address,
    city: city,
    billingName: billingName,
    billingBox: billingBox,
    billingAddress: billingAddress,
    orgNumber: orgNumber,
    email: email.toLowerCase(),
    phone: phone
  }))
  data.append('file', logo)
  return await fetch(EXPRESS_URL + '/updateuserProfile/' + previousname, {
    method: 'POST',
    credentials: 'include',
    body: data
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok')
    } else {
      return response
    }
  }).catch(err => {
    console.error('There has been a problem with your fetch operation:', err)
  })
}


export async function getImg (filename) {
  const promise = await fetch(EXPRESS_URL + '/image/' + filename, {
    method: 'GET',
    credentials: 'include'
  }).then((res) => {
    return res
  }).then((success) => {
    return success
  }).catch(error => {
    return error
  })

  return promise
}

export async function logout () {
  await fetch(EXPRESS_URL + '/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  return true
}
