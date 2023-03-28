# web-scrapper-uploader
A Web Scrapping Script to get information and Image Links, using Node.js, ImageKit, and Firebase

The Scraped image links will then be saved into Imagekit hosting service, 
then the resulting image links from imagekit will be saved along with other scraped information into Firebase's Realtime Database using their REST API

## Getting Started

1. Run  `npm install` to install necessary packages.

2. Create a `.env` file containing the necessary information, the content should look like the contents in `.env_example` file.

3. Configure your `url` and `urlBase` in the file `scrape.js`, change the `list` variable to your desired list of things to scrap. Then inside the `Promise.all` statement, change the logic to accomodate your needs.

4. Next configure your firebase config in `firebaseAppConfig.js`, you can find the config in your Firebase App console in `Project Settings > General`.

5. Finally go to `index.js` file, if you need any more processing after uploading your Image, you can do so in the `Promise.all()` statement.

6. Go to your command line and run `node index` and you're good to go!
