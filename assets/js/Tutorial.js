//--------------Function that embeds the YouTube video to the tutorial page----------------
var player;       
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '410',
    width: '660',
    videoId: 'eyoh-Ku9TCI',
  });
}
//-----------------------------------------------------------------------------------------



//---------------------------Go back button functionality----------------------------------
var returnButton= document.querySelector("#button1");
returnButton.addEventListener("click",function(){
  console.log(window.location.href='index.html')
});
//-----------------------------------------------------------------------------------------
