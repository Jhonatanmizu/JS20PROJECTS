const videoElement = document.getElementById("video");
const button = document.getElementById("btn-start");
// prompt to select media stream, pass to video element, then play
console.log("Video", videoElement)
async function  selectMediaStream(){
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () =>{
            videoElement.play();
        }
    } catch (error) {
        // Catch error here
        console.log("whoops, error here",error);
    }
}

button.addEventListener('click', async () => {
    // Disable button
    button.disabled = true;
    // Start Picture in picture
    await videoElement.requestPictureInPicture();
    // Reset the button
    button.disabled = false;
})
// On load
selectMediaStream();
