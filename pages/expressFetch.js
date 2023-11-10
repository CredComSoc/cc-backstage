const FormData = require('form-data')
export async function register(isadmin, username, password, description, address, city, billingName, billingBox, billingAddress, orgNumber, email, phone){
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
      'Content-Type' : 'multipart/form-data'
    }
  })
    .then((response) => {
      return response
    })
}

export async function login(){
  var email = "admin@nowhere.com"
  var password = "testpassword"

  return await fetch("localhost:3000" + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email, password: password}),
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