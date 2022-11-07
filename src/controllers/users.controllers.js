import { errorHandler } from "../errors/errorHandler.js";
import { read, write } from "../utils/FS.js";
import { loginPost, usrsPost } from "../validate/validate.js";
import sha256 from "sha256";
import path from "path";
import jwt from "../utils/jwt.js";

// const host = "http://192.168.4.77:9090"
const host = "http://192.168.4.184:9090";

const USERSGET = async (req, res, next) => {
  const users = await read("users.model.json").catch((error) =>
    next(new errorHandler(error), 401)
  );
  const newlink = users.filter((e) => {
    e.viewLink = `${host}${e.viewLink}`;
    e.downloadLink = `${host}${e.downloadLink}`;
    return e;
  });
  res.send(newlink);
};

const IMG_GET = async (req, res, next) => {
  const { img } = req.params;
  res.sendFile(path.join(process.cwd(), "src", "assets", "img", img));
};

const SKACHAT = async (req, res, next) => {
  const { img } = req.params;
  res.download(path.join(process.cwd(), "src", "assets", "img", img));
};

const LOGINPOST = async (req, res, next) => {
  const { error, value } = loginPost.validate(req.body);

  if (error) {
    return next(new errorHandler(error.message, 400));
  }

  const { name, password } = value;

  const users = await read("users.model.json").catch((error) =>
    next(new errorHandler(error), 401)
  );

  const findUsers = users.find(
    (e) => e.name == name && e.password == sha256(password)
  );

  if (!findUsers) {
    return next(new errorHandler("name and password did not match", 500));
  }

  if (findUsers) {
    res.status(200).json({
      message: "Success",
      status: 200,
    });
  }
};

const USERSPOSTS = async (req, res, next) => {
  const { error, value } = usrsPost.validate(req.body);
  const { avatar } = req.files;

  if (error) {
    return next(new errorHandler(error.message, 400));
  }

  const { name, password } = value;

  const users = await read("users.model.json").catch((error) =>
    next(new errorHandler(error), 401)
  );

  const findUsers = users.find((e) => e.name == name);

  if (findUsers) {
    return next(new errorHandler("There are such users", 409));
  }

  const usersName = Date.now() + avatar.name.replace(/\s/g, "");
  avatar.mv(path.join(process.cwd(), "src", "assets", "img", usersName));
  users.push({
    id: users.at(-1)?.id + 1 || 1,
    name,
    password: sha256(password),
    viewLink: "/view/" + usersName,
    downloadLink: "/download/" + usersName,
  });

  const newUsers = await write("users.model.json", users);
  const agent = req.headers["user-agent"];
  const ip = req.ip;



  if (newUsers) {
    return res.status(200).json({
      status: 200,
      message: "Success",
      access_token: jwt.sing({ id: newUsers.id , ip:ip, agent: agent}),
    });
  }
};

export { USERSGET, USERSPOSTS, LOGINPOST, IMG_GET, SKACHAT };
