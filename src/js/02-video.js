import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const STORAGE_KEY = "videoplayer-current-time";
const videoElement = document.querySelector('#vimeo-player');

const player = new Player(videoElement, {
    id: 19231868,
    width: 1080
});

player.on('timeupdate', throttle(function(data) {
  console.log(data)
  const {seconds} = data;
  localStorage.setItem(STORAGE_KEY, seconds);
},1000));

const localTime = localStorage.getItem(STORAGE_KEY);

player.setCurrentTime(localTime);

