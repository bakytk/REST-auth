
import jwt from 'jsonwebtoken';

const authVerify = (secret) => (req, res, next) => {
  /*
    Verify auth_header_Bearer_token:
    - if ok => add token_data to "req.decode"
  */
  let authHeader = req.headers['authorization'] || '';
  let token = "";
  if (authHeader.startsWith("Bearer ")){
  token = authHeader.substring(7, authHeader.length);
  };
  if (!token) {
    return res.status(401).json({
      error: "No auth header or not Bearer type"
    });
  } else {
    jwt.verify(token, secret, function (err, decode){
      if (err) {
        return res.status(401).json({ error: "Invalid auth token" });
      } else {
        //console.log("decode", decode);
        req.decode = decode;
        next();
      }
    })//jwt.verify()
  }//if-else
};

export { authVerify };
