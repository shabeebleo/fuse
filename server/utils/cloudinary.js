// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
import {v2 as cloudinary} from 'cloudinary'
// const cloudinary = require("cloudinary").v2;



cloudinary.config({
  cloud_name: "dooc9crf3",
  api_key: "267597387749432",
  api_secret: "3dNkwI9lEirdt0uYPqLp6k-8G_8",
});

// module.exports = { cloudinary };
export default cloudinary
