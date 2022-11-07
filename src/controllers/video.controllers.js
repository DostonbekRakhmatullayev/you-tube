import { errorHandler } from "../errors/errorHandler.js";
import { read, write } from "../utils/FS.js";
import { videoPost } from "../validate/validate.js";
import path from "path";

const host = "http://192.168.4.184:9090";
// 192.168.4.184
const VIDEO = async (req, res, next) => {
  const { error, value } = videoPost.validate(req.body);

  if (error) {
    return next(new errorHandler(error.message, 500));
  }

  const { title, usersId } = value;
  const { video } = req.files;

  const newvideo = await read("video.model.json").catch((error) =>
    next(new errorHandler(error.message, 500))
  );
  const newName = Date.now() + video.name.replace(/\s/g, "");

  if (!newName) {
    return next(new errorHandler("Not found"));
  }

  video.mv(path.join(process.cwd(), "src", "assets", "video", newName));

  newvideo.push({
    id: newvideo.at(-1)?.id + 1 || 1,
    title,
    usersId,
    viewLink: "/view/" + newName,
    downloadLink: "/download/" + newName,
    size: video.size,
  });
  const newvideos = await write("video.model.json", newvideo).catch((error) =>
    next(new errorHandler(error, 500))
  );

  if (newvideos) {
    res.status(200).json({
      message: "Success",
    });
  }
};

const VIDEOGET = async (req, res, next) => {
  const video = await read("video.model.json").catch((error) =>
    nexy(new errorHandler(error, 500))
  );

  const felter = video.filter((e) => {
    (e.viewLink = `${host}${e.viewLink}`),
      (e.downloadLink = `${host}${e.downloadLink}`);
    return e;
  });

  res.send(felter);
};

const VIDEO__GET = (req, res, next) => {
  const { id } = req.params;
  console.log("ok");
  console.log(path.join(process.cwd(), "src", "assets", "video", id));
  res.sendFile(path.join(process.cwd(), "src", "assets", "video", id))
};


export { VIDEO, VIDEOGET , VIDEO__GET};




