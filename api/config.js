// const CC_BACKEND_URL = process.env.CC_BACKEND_URL
require('dotenv').config()
const CC_BACKEND_URL = "https://api.credcomstaging.mutualcredit.services"
const CC_NODE_URL = "http://ledger-staging.mutualcredit.services"
const CC_NODE_ENABLED = true
const DB_URL = "mongodb+srv://MCS-SB-admin:4%25D3SgU3x%24gCJUFCQI@lcc-dev.fwxxeyv.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"
const DB_FOLDER = "vt-web-app"

console.log("Environment variables: ", CC_BACKEND_URL, CC_NODE_URL, DB_URL, DB_FOLDER, CC_NODE_ENABLED)

export { CC_BACKEND_URL, CC_NODE_URL, DB_URL, DB_FOLDER, CC_NODE_ENABLED }
