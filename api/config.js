// const CC_BACKEND_URL = process.env.CC_BACKEND_URL
require('dotenv').config()
const CC_BACKEND_URL = "https://api.credcomstaging.mutualcredit.services"
const CC_NODE_URL = process.env.CC_NODE_URL
const CC_NODE_ENABLED = process.env.CC_NODE_ENABLED
const DB_URL = process.env.DB_URL
const DB_FOLDER = process.env.DB_FOLDER

console.log("Environment variables: ", CC_BACKEND_URL, CC_NODE_URL, DB_URL, DB_FOLDER, CC_NODE_ENABLED)

export { CC_BACKEND_URL, CC_NODE_URL, DB_URL, DB_FOLDER, CC_NODE_ENABLED }
