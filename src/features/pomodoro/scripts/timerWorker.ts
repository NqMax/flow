import type { TimerEvent } from "@/features/pomodoro/types/timerWorkerTypes";

let time: number;
let intervalId: number;

function messageHandler(e: MessageEvent<TimerEvent>) {
  if (e.data.type === "stopTimer") {
    clearInterval(intervalId);

    return;
  }

  if (e.data.type === "startTimer") {
    clearInterval(intervalId);

    time = e.data.timeLeft;

    intervalId = window.setInterval(() => {
      postMessage({ intervalId, timeLeft: --time });
    }, 1000);

    return;
  }
}

onmessage = messageHandler;
