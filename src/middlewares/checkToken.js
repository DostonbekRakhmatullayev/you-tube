import { errorHandler } from "../errors/errorHandler.js";
import jwt from "../utils/jwt.js";

export default (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      return next(new errorHandler("Required token", 500));
    }
    const { id, ip, agent } = jwt.verify(access_token);

    if (ip != req.ip || agent != req.headers["user-agent"]) {
      return next(
        new errorHandler("This token is taken from somewhere else", 500)
      );
    }

    return next();
  } catch (error) {
    return next(new errorHandler("token natug'ri", 500));
  }
};
