1> npm install -> to install packages
2> npm start -> to run the project

=> create a react app using npx create react app

=> installed and configured the tailwindcss for css(styling)

=> installed react-router-dom for routing functionality

=> installed react player for to play the video

=> used react-redux and @reduxjs/toolkit for data management

=> created two custom hooks
==> useGetData() -> it returns the data from pixabay api call https://pixabay.com/api/videos/?key=${process.env.REACT_APP_MY_API_KEY}&q=&pretty=true&page=

==> useDeviceCheck() -> it returns the device type is "mobile" or not, with the help of this hook i implemented swipe up and down functionality for mobile and navigation buttons for desktop to change the video

//video section
=> starting it shows 18 videos in video section

=> when the user click on the video the video will played

=> Initillay it shows list of videos when we click on particular video it navigate to video-player component, and that video will be played on video player

=> when the user directly open the video player, instead of navigating from video-list component a random number is generated based on random number index it set the video as present video and videos list will be created from the api call

//video player
=> in this video player there is no title for the video so I included the tags for this video

=> for mobile added swipUp and swipeDown functionality to change the video

=> created custom cotrolls: play, pause, previuos video, next video, change quality, volume increase ...etc

=> created a static like button

=> created a video progress indicator based on video current duration/time it will increase
=>here not implemented seek functionality

=> here the video will be paused automatically pause when video current duration reaches the video duration

=> when there is an error while fetch call it return to errorPage
