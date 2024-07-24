const dotenv = require('dotenv-flow')

CC_BACKEND_URL = process.env.CC_BACKEND_URL
CC_NODE_URL = process.env.CC_NODE_URL
CC_NODE_ENABLED = process.env.CC_NODE_ENABLED
DB_URL = process.env.DB_URL
DB_FOLDER = process.env.DB_FOLDER

export { CC_BACKEND_URL, CC_NODE_URL, DB_URL, DB_FOLDER, CC_NODE_ENABLED }
