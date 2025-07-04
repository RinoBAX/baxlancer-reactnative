import { Cloudinary } from "@cloudinary/url-gen";

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: process.env.CLOUD_NAME!,
  },
});

export default cloudinary;
