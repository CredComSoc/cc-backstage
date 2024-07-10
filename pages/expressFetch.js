const FormData = require('form-data')
const EXPRESS_URL = "http://localhost:3000" //The address for the CreditCoopTech backend (the main app, not the admin app)
const CHAT_URL = "http://localhost:3001" //The address for the CreditCoopTech chat backend

/*This file has calls to the CreditCoopTech backend express app for things such as login, authenticate and chat functions*/
export { CHAT_URL };

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

export async function checkAdminStatus() { //checks if the user logged in is an admin
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

export async function getCurrentUser() { //Gets the member info of the currently logged in user
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

//This is to be used when modifying the profile of a user.
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

//This takes the filename of an image stored in the database and uses the CreditCoopBackend to retrieve it
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


//This ensures that the user is not logged in by telling the backend that they are no longer logged in
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
