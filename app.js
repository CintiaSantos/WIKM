require("dotenv").config();
const Clarifai = require('clarifai');
const cloudinary = require('cloudinary');
const CLARIFAI_FOOD_MODEL = "bd367be194cf45149e75f01d59f77ba7";
const CLARIFAI_API_KEY = process.env.key;
const CLOUDINARY_API_PUBLIC = process.env.publicKey;
const CLOUDINARY_API_SECRET = process.env.secretKey;

let analyzeImage = ""; // will hold the image url

// init Clarifai API
const cApp = new Clarifai.App({
    apiKey: CLARIFAI_API_KEY
});

// init Cloudinary API
cloudinary.config({
    cloud_name: 'samp',
    api_key: CLOUDINARY_API_PUBLIC,
    api_secret: CLOUDINARY_API_SECRET
});

// uploads the image to a remote server using the cloudinary API and returns a link to the stored image
// using the image link - performs a model predict query to the clarifai (machine learning) API
cloudinary.uploader.upload("./test.jpg", function (result) {
    if (result)
        analyzeImage = result.url;
    console.log(result.url);
    cApp.models.predict(CLARIFAI_FOOD_MODEL, analyzeImage).then(
        function (response) {
            console.log(response.outputs[0].data); //TODO: perform meaningful task with the data
        },
        function (err) {
            console.error(err);
        }
    );
});
/*
TODO:
1) pass the api the image url / location
2) map out the response object into small chuncks of information
3) filter and manipulate the information for our needs
*/

// predict the contents of an image by url


// unsigned uploads Preset name: kd18s7co
// uploads to https://res.cloudinary.com/samp/image/upload/