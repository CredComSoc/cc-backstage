// const CC_BACKEND_URL = "http://localhost:3000" //The address for the CreditCoopTech backend (the main app, not the admin app)
// //const CC_NODE_URL = "http://161.35.95.33" //CC-node address
// const CC_NODE_URL="http://ledger-staging.mutualcredit.services"
// const CC_NODE_ENABLED = true
// const DB_URL="mongodb+srv://MCS-SB-admin:4%25D3SgU3x%24gCJUFCQI@lcc-dev.fwxxeyv.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"
// //const DB_URL = "mongodb+srv://lukbj623:kZVtbkb4Cr093CC5@cluster0.49bpcgc.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"
// const DB_FOLDER = "vt-web-app"

const dotenv = require('dotenv-flow')

CC_BACKEND_URL = process.env.CC_BACKEND_URL
CC_NODE_URL = process.env.CC_NODE_URL
CC_NODE_ENABLED = process.env.CC_NODE_ENABLED
DB_URL = process.env.DB_URL
DB_FOLDER = process.env.DB_FOLDER

export { CC_BACKEND_URL, CC_NODE_URL, DB_URL, DB_FOLDER, CC_NODE_ENABLED }
