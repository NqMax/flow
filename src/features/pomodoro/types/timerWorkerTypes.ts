type TimerEvent =
  | { type: "stopTimer" }
  | { type: "startTimer"; timeLeft: number };

type TimerMessage = { intervalId: number; timeLeft: number };

interface TimerWorker extends Worker {
  postMessage(message: TimerEvent): void;
  onmessage: ((this: Worker, ev: MessageEvent<TimerMessage>) => unknown) | null;
}

export type { TimerEvent, TimerMessage, TimerWorker };
