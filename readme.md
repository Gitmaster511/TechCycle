#For People reviewing this code

Much of this code was provided as a baseplate so I will tell you what I made


App.jsx - First thing the code opens, to keep it clean I just put the navigation.jsx component in it so check that out

Navigation.jsx - The navigation for the app, including the sick bottom nav bar

/ pages / Home / Home.jsx - The Homepage with the image carousel and firebase read

/ pages / Home / itemdetails.jsx - When the user clicks on one of these images it passes the data to a new page and displays the info about the part

/ pages / Map / Map.jsx - The Map component of this, if this is the updates version all the markers should be ahrdcoded since my google maps api ran out mid project

/ pages / Price / prices.jsx - Includes all the code neccesary for the price calculation page, includes the GPT call, (You will have to provide your own OpenAPI key)

/ pages / upload / upload.jsx - The Code for the middle button to upload parts to the database

Disclaimer: Since I had to write comments inside the return function some of them will look like this "{*/ /*}* and may not be easily visible
