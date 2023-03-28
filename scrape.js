//we use axios to get the HTML file and cheerio to access the HTML DOM ala jQuery style.
const cheerio = require('cheerio');
const axios = require('axios');

// the urls you want to get scrapped information from 
const url="https://yourchosenweb.com/some-links"
const urlBase="https://yourchosenweb.net"


/**
 * Function to access the web and scrape the information(text,image links, etc)
 * @returns a promise object with resolve being the scrapped information as an object, and reject being the error messages
 */
async function getHtml(){
  //returns a promise so it can be accessed with .then() functions
  return new Promise((resolve, reject) => {
    //get the page
    axios.get(url).then((res) => {
      const $ = cheerio.load(res.data)
      //get the list of scraped objects
      const list = $(".ent-name")
      //store scraped objects data
      let data = {}
      
      //access the scrapeds objects individual web pages from the list earlier 
      const dataPromises = list.map( async i =>{
        //returns a collection of promise objects
        return axios.get(`${urlBase}${list[i].attribs.href}`)
      })

      //catch all the promise objects earlier
      Promise.all(dataPromises).then(page => {
        //resulting response is an array of the lists HTML page
        page.forEach((res, i ) => {
          let $ = cheerio.load(res.data)
          //insert scrapping logic here, below is just an example
          let name = $('h1').contents().first().text()
          let str = `[alt="some attribute string"]`
          let imgLink = $(str)[0].attribs.src
          //add the new scraped info into the variable, preferably have an image attribute
          data[i+1] = {name : name,image:imgLink}
        })
        //returns the scraped data, when successful
        resolve(data)
      }).catch(err => reject(err))
    }).catch((error) => reject(error))
  })
}

module.exports = {getHtml}

