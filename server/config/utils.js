const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const PRIV_KEY = fs.readFileSync(path.join(__dirname, 'private_key.pem'), 'utf8');
const PUB_KEY = fs.readFileSync(path.join(__dirname, 'public_key.pem'), 'utf8');

function issueJWT() {
  const payload = {
    iat: Date.now()
  };
  
  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { algorithm: 'RS256' });
  
  return {
    token: signedToken,
    expires: Date.now() + 300000
  }
}

async function verifyJWT(signedJWT) {
  try {
    await jsonwebtoken.verify(signedJWT, PUB_KEY, { algorithms: ['RS256'] });
    /* Actual Verification with database */
    return true;
  }
  catch (err) {
    console.log(err);
    return false;
  }
}

module.exports.issueJWT = issueJWT;
module.exports.verifyJWT = verifyJWT;