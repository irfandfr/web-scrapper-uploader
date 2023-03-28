# web-scrapper-uploader
A Web Scrapping Script to get information and Image Links

The Scraped image links will then be saved into Imagekit hosting service, 
then the resulting image links from imagekit will be saved along with other scraped information into Firebase's Realtime Database using their REST API

## Getting Started

Run  `npm install` to install necessary packages.

Create a `.env` file containing the necessary information, the content should look like the contents in `.env_example` file.

Configure your `url` and `urlBase` in the file `scrape.js`, change the `list` variable to your desired list of things to scrap. Then inside the `Promise.all` statement, change the logic to accomodate your needs.

Next configure your firebase config in `firebaseAppConfig.js`, you can find the config in your Firebase App console in `Project Settings > General`.

Finally go to `index.js` file, if you need any more processing after uploading your Image, you can do so in the `Promise.all` statement.

Go to your command line and run `node index` and you're good to go!
