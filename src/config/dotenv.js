const path = require('path');
const dotenv = require('dotenv')

if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: path.join(__dirname, '/production.env') });
} else if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: path.join(__dirname, '/development.env') });
} else {
    throw new Error('process.env.NODE_ENV not set.')
}
