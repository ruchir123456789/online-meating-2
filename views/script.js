const socket = io('/');
const videoGrid = document.getElementById('video')
var peer = new Peer();

const myvideo = document.createElement('video');
myvideo.muted = true;
const peers ={};

var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
getUserMedia({video: true, audio: true}, function(myvideo,stream) {
  var call = peer.call('another-peers-id', stream);
  call.on('stream', function(remoteStream) {
    // Show stream in some video/canvas element.
    
  });
}, function(err) {
  console.log('Failed to get local stream' ,err);
});  