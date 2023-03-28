//import Imagekit pack
var ImageKit = require("imagekit");

//import to enable .env files usage
const dotenv = require('dotenv')
dotenv.config()

//your Imagekit configurations, change the value on your .env file
var imagekit = new ImageKit({
    publicKey : process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey : process.env.IMAGE_KIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGE_KIT_URL_ENDPOINT
});

/**
 * This functions saves an image using the image's url you scraped from the web
 * @param {string} url the scraped url of the image you want to save
 * @param {string} name the file names
 * @returns  Promise Object with resolve being the saved image's link and reject being the error message
 */
async function imageKitUpload(url,name){
  return new Promise((resolve,reject) => {
    imagekit.upload({
      file : url, //required
      fileName : `${name}.png` //required
    }, function(error, result) {
      if(error) reject(error);
      else resolve(result.url);
    });
  })
}

module.exports = {imageKitUpload}