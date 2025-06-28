let timeLeft: number;

function messageHandler(e) {
  if (e.data.type === "getTimer") {
    return timeLeft;
  }

  if (e.data.type === "startTimer") {
    timeLeft = e.timeLeft;

    const intervalId = setInterval(() => {
      postMessage({ intervalId, timeLeft: --timeLeft });
    }, 1000);

    return;
  }
}

onmessage = messageHandler;

// -----------------------------------------------------------

const worker = new Worker();

function useWorkerTimer() {
  function startTimer() {
    worker.postMessage({ type: "startTimer", timeLeft: 1500 });
  }

  worker.onmessage = (e) => {
    const { intervalId, timeLeft } = e;
  };

  return { startTimer };
}
