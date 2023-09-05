var progressBar = document.querySelector(".progress-bar");
var progress = progressBar.querySelector(".progress");
var progressDot = document.querySelector("span");
var timer = progressBar.querySelector(".timer");
var progressBarWidth = progressBar.clientWidth;

var isDrag = false;
var initialClientX = 0;
var initalRate = 0;
var rate = 0;

var handleChange = function (value) {
  console.log(value);
};

progressBar.addEventListener("mousedown", function (e) {
  rate = (e.offsetX * 100) / progressBarWidth; //Tính tỷ lệ phần trăm giữa vị trí click với chiều rộng
  progress.style.width = `${rate}%`;
  initalRate = rate;
  isDrag = true;
  initialClientX = e.clientX;
  handleChange(rate);

  var currentTime = (audio.duration * rate) / 100;
  currentTimeEl.innerText = getTime(currentTime);
  audio.currentTime = currentTime;
});

progressDot.addEventListener("mousedown", function (e) {
  e.stopPropagation();
  isDrag = true;
  initialClientX = e.clientX;
});

document.addEventListener("mousemove", function (e) {
  if (isDrag) {
    var space = e.clientX - initialClientX;
    rate = (space * 100) / progressBarWidth + initalRate;
    if (rate >= 0 && rate <= 100) {
      progress.style.width = `${rate}%`;
      handleChange(rate);
    }
  }
});

document.addEventListener("mouseup", function () {
  isDrag = false;
  initalRate = rate;

  var currentTime = (audio.duration * rate) / 100;
  currentTimeEl.innerText = getTime(currentTime);
  audio.currentTime = currentTime;
});

var audio = document.querySelector(".audio");
var currentTimeEl = progressBar.previousElementSibling;
var durationTimeEl = progressBar.nextElementSibling;
var playBtn = document.querySelector(".play-btn");

var playIcon = `<i class="fa-solid fa-play"></i>`;
var pauseIcon = `<i class="fa-solid fa-pause"></i>`;

//Đổi thời gian dạng phút:giây
var getTime = function (seconds) {
  var mins = Math.floor(seconds / 60);
  seconds = Math.floor(seconds - mins * 60);
  return `${mins < 10 ? "0" + mins : mins}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
};

audio.addEventListener("loadeddata", function () {
  durationTimeEl.innerText = getTime(audio.duration);
});

playBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  if (audio.paused) {
    audio.play();
    this.innerHTML = pauseIcon;
  } else {
    audio.pause();
    this.innerHTML = playIcon;
  }
});

audio.addEventListener("timeupdate", function () {
  if (!isDrag) {
    currentTimeEl.innerText = getTime(this.currentTime);
    rate = (this.currentTime / this.duration) * 100;
    progress.style.width = `${rate}%`;
  }
});

audio.addEventListener("ended", function () {
  rate = 0;
  audio.currentTime = 0;
  progress.style.width = 0;
  playBtn.innerHTML = playIcon;
});

progressDot.addEventListener("mousemove", function (e) {
  e.stopPropagation();
});

progressBar.addEventListener("mousemove", function (e) {
  timer.style.display = "block";
  timer.style.left = `${e.offsetX}px`;
  var rate = (e.offsetX * 100) / this.clientWidth;
  var currentTime = (audio.duration * rate) / 100;
  timer.innerText = getTime(currentTime);
});

progressBar.addEventListener("mouseout", function () {
  timer.style.display = "none";
});
