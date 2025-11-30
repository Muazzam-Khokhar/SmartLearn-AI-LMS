import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(),"uploads");

if(!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, {recursive:true});

const storage = multer.diskStorage({
  destination: function(_req,_file,cb){
    cb(null,uploadDir);
  },
  filename: function(_req,file,cb){
    const ext = path.extname(file.originalname)
    const name = `${Date.now()}-${Math.random().toString(36).slice(2,8)}${ext}`;
    cb(null,name);
  },
});
export const upload = multer({
  storage,
  limits:{fileSize:50 * 1024 * 1024}
})
