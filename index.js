/**
 * This is the main file to run the scrapping procedure
 * The file first get the necessary scrapped information with getHtml() function, 
 *  it returns a promise object with the scraped data.
 * Then the data gets looped and individual html links are uploaded with imageKitUpload() function,
 *  the resulting promise objects are then processed into a payload.
 * Then the payload is given into the firebaseUpload to store the informations
 * run node index in your command line to start scraping!
 */
const {getHtml} = require('./scrape')
const {imageKitUpload} = require('./uploadImage')
const {firebaseUpload} = require('./uploadFirebase')

getHtml().then( res => {
  let dataWithImage={}
  const uploadPromise = Object.keys(res).map(key => {
    //returns a collection of promises
    return imageKitUpload(res[key].image,res[key].name)
  })
  
  //wait for all the promises to complete
  Promise.all(uploadPromise).then(imgLinks =>{
    //the resultant response is an array of image links
    imgLinks.forEach((url,index) => {
      //if you need some more processing for the object, this is the place
      dataWithImage[res[index+1].name]={name:res[index+1].name, image:url}
    })
    firebaseUpload(dataWithImage).then(res => console.log(res))
  })
}).catch(err => console.log(err))