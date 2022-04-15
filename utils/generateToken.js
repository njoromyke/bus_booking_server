import jwt from "jsonwebtoken";
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN, {
    expiresIn: "2000d",
  });
};
export default generateToken;
