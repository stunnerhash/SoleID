import jwt from "jsonwebtoken";

const secret = 'test';

const auth = async (req, res, next) => {
  console.log(req.headers.authorization + "hello i am");
  try {
    if (req.headers.authorization === undefined) {
      return res.json("token is required");
    }
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    console.log(token + "token hello")
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);
      req.id = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.id = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;