import Popup from "./popup.js";
import timerFun from "./time.js";

export default async function audioRec(mediatype) {
  if (!navigator.mediaDevices) {
    console.log("navigator.mediaDevices not available");
    return false;
  }

  let mediaContent;
  const mediaType = mediatype;

  try {
    if (!window.MediaRecorder) {
      console.log("window.MediaRecorder not available");
      return false;
    }

    const container = document.getElementById("root");
    const timer = container.querySelector(".timeline_record_time");
    const minutes = timer.querySelector(".timerMinutes");
    const seconds = timer.querySelector(".timerSecondes");

    minutes.innerText = "00";
    seconds.innerText = "00";
    const submitButton = container.querySelector(
      ".submit_record_button"
    );
    const cancelButton = container.querySelector(
      ".cancel_record_button"
    );
    const widgetTimelineForm = container.querySelector(
      ".timeline_form"
    );
    let timerId;
    const media = document.createElement(`${mediaType}`);
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: mediaType === "video",
    });
    const recorder = new MediaRecorder(stream);
    const chunks = [];

    const videoPlayer = document.createElement("div");
    if (mediaType === "video") {
      videoPlayer.classList.add("video_player");
      media.srcObject = stream;
      media.play();
      media.controls = true;
      media.muted = "muted";
      videoPlayer.append(media);
      widgetTimelineForm.before(videoPlayer);
    }

    const submitRecord = () => {
      recorder.stop();
      submitButton.removeEventListener("click", submitRecord);
    };

    const cancelRecord = () => {
      recorder.stop();
      cancelButton.removeEventListener("click", cancelRecord);
    };

    recorder.addEventListener("start", () => {
      console.log("recording started");
      timerId = setInterval(() => timerFun(minutes, seconds), 1000);
    });

    recorder.addEventListener("dataavailable", (evt) => {
      console.log("data available");
      chunks.push(evt.data);
    });

    submitButton.addEventListener("click", submitRecord);

    cancelButton.addEventListener("click", cancelRecord);

    recorder.addEventListener("stop", () => {
      const blob = new Blob(chunks);
      media.src = URL.createObjectURL(blob);
      media.controls = true;
      clearInterval(timerId);
      stream.getTracks().forEach((track) => track.stop());
      media.srcObject = null;
      videoPlayer.remove();
    });

    recorder.start();
    mediaContent = media;
  } catch (e) {
    console.error(e);
    const popup = new Popup();
    popup.showPopup();
  }
  return mediaContent;
}
