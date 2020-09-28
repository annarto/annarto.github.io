// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/OZ7K7_L4x/model.json';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL);
}

function setup() {
  createCanvas(600, 600);

  var options = {
    video: {
       
        facingMode: {
         exact: "environment" // "user" should be the other option: https://discourse.processing.org/t/switching-between-front-and-rear-camera-on-a-smartphone-using-p5-js-4140/15316
       }
    }
  };

  // Create the video
  // video = createCapture(VIDEO);
  video = createCapture(options);
  video.size(600, 600);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label + ': ' + results[0].confidence;

  if (results[0].label == 'Weiß' && results[0].confidence > 0.99) {
    alert('Anna knows best!');
  }
  
  // Classifiy again!
  classifyVideo();
}