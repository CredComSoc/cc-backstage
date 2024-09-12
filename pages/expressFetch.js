const FormData = require('form-data')
// import { response } from 'express';
import { CC_BACKEND_URL } from '/api/config.js'
// const EXPRESS_URL = "http://localhost:3000" //The address for the CreditCoopTech backend (the main app, not the admin app)
// const CHAT_URL = "http://localhost:3001" //The address for the CreditCoopTech chat backend
const EXPRESS_URL = CC_BACKEND_URL
const CHAT_URL = CC_BACKEND_URL
/*This file has calls to the CreditCoopTech backend express app for things such as login, authenticate and chat functions*/
export { CHAT_URL };

const standardCreditLine = -5000
const standardMaxAmount = 20000

export async function register (isadmin, username, password, description, address, city, billingName, billingBox, billingAddress, orgNumber, email, phone, logo) {
  // const hashedPassword = hashMyPassword(password) // maybe doing this in backend for security
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
    min_limit: standardCreditLine,
    max_limit: standardMaxAmount
  }))
  data.append('file', logo)
  return await fetch(EXPRESS_URL + '/register', {
    method: 'POST',
    body: data
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

// Probably needs to be changed to graphql and moved to gqlFetch.js

export async function createNewCategories (data) {
  return await fetch(EXPRESS_URL + '/categories', { 
    method: 'POST',
    credentials: 'include',
    body: data 
  }).then((res) => {
    return res
  }).then((success) => {
    return success
  }).catch(error => {
    return error
  }) 
}
// export async function createNewCategories(data) {
//   try {
//     const response = await fetch(EXPRESS_URL + '/categories', { 
//       method: 'POST',
//       credentials: 'include',
//       body: JSON.stringify(data), // Assuming data is an object
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });

//     if (!response.ok) {
//       throw new Error('Failed to create new categories');
//     }

//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error('Error creating new categories:', error);
//     throw error; // Rethrow the error for handling in the calling function
//   }
// }


export async function getCategories () {
  return fetch(EXPRESS_URL + '/categories', { 
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then((response) => {
    return response.json()
  }).catch(() => {
    return null
  })
}


export async function deleteCategoriesCache() {
  try {
    const response = await fetch(EXPRESS_URL + '/deleteCategoriesCache', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to delete categories cache');
    }

    return response.json(); // Assuming you want to parse the response
  } catch (error) {
    console.error('Error deleting categories cache:', error);
    throw error; // Rethrow the error for handling in the calling function
  }
}

export async function updateCategoryStatus (data) {
  console.log(data)
  return await fetch(EXPRESS_URL + '/updateCategoryStatus', { 
    method: 'POST',
    
    credentials: 'include',
    body: data 
  }).then((res) => {
    return res
  }).then((success) => {
    return success
  }).catch(error => {
    return error
  }) 
}

export async function editCategories (data) {
  console.log('Edit category: ', data)
  return await fetch(EXPRESS_URL + '/editCategory', {
    method: 'POST',

    credentials: 'include',
    body: data
  }).then((res) => {
    return res
  }).then((success) => {
    return success
  }).catch((error) => {
    return error
  })
}



export async function createNewPlace (data) {
  return await fetch(EXPRESS_URL + '/places', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then((response) => {
    return response.json()
  }).catch(error => {
    console.error(error)
    return null
  })
}
// export async function createNewPlace(data) {
//   try {
//     const response = await fetch(EXPRESS_URL + '/places', {
//       method: 'POST',
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     });

//     if (!response.ok) {
//       throw new Error('Error creating new place');
//     }

//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error('Error creating new place:', error);
//     throw error; // Rethrow the error for handling in the calling function
//   }
// }


export async function getPlaces () {
  return fetch(EXPRESS_URL + '/places', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then((response) => {
    return response.json()
  }).catch((err) => {
    console.error(err)
    return null
  })
}

export async function deletePlace (data) {
  return await fetch(EXPRESS_URL + '/deletePlace', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then((response) => {
    return response.json()
  }).catch((err) => {
    console.error(err)
    return null
  })
}
// export async function deletePlace(data) {
//   try {
//     const response = await fetch(EXPRESS_URL + '/deletePlace', {
//       method: 'POST',
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     });

//     if (!response.ok) {
//       throw new Error('Failed to delete place');
//     }

//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error('Error deleting place:', error);
//     throw error; // Rethrow the error for handling in the calling function
//   }
// }


export async function deletePlacesCache() {
  return fetch(EXPRESS_URL + '/deletePlacesCache', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then((response) => {
    return response
  }).catch(() => {
    return null
  })
}
// export async function deletePlacesCache() {
//   try {
//     const response = await fetch(EXPRESS_URL + '/deletePlacesCache', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       credentials: 'include'
//     });

//     if (!response.ok) {
//       throw new Error('Failed to delete places cache');
//     }

//     return response.json(); // Assuming you want to parse the response
//   } catch (error) {
//     console.error('Error deleting places cache:', error);
//     throw error; // Rethrow the error for handling in the calling function
//   }
// }


