require('dotenv').config();

// access a variable inside process.env, throwing an error if its not found
// always run this method in advance (i.e. upon initialization) so that error is thrown as early as possible
// caching the values improves performance - accessing process.env many times is bad
const cache = {};

const acessEnv = (key, defaultValue) => {
    if (!(key in process.env)) {
        if (defaultValue) return defaultValue;
        throw new Error(`${key} not found in process.env`)
    }

    if (cache[key]) return cache[key];
    return process.env[key];
}


module.exports = acessEnv;