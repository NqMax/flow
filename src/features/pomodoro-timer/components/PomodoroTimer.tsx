"use client";
import { useState } from "react";
import { usePomodoroTimer } from "@/features/pomodoro-timer/hooks/usePomodoroTimer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimerResetIcon } from "lucide-react";
import { timeToMinutes, timeToSeconds } from "@/features/pomodoro-timer/utils";

export function PomodoroTimer() {
  const [currentTab, setCurrentTab] = useState("work");

  const {
    time,
    isRunning,
    currentState,
    pomodoroCount,
    pomodoroConfig,
    handleStart,
    handleStop,
    handleReset,
  } = usePomodoroTimer(setCurrentTab);

  const minutes = timeToMinutes(time);
  const seconds = timeToSeconds(time);

  const states = ["work", "shortBreak", "longBreak"] as const;

  return (
    <div className="mx-auto my-auto flex flex-col">
      <div className="font-medium">Pomodoros so far</div>
      <div className="mb-2 text-xs">
        <span className="mr-1 text-sm">{pomodoroCount}</span>
        {Array(pomodoroCount)
          .fill(null)
          .map(() => "🍅")}
      </div>
      <div className="rounded-lg border p-4">
        <Tabs
          value={currentTab}
          onValueChange={(value) => setCurrentTab(value)}
          className="w-[400px]"
        >
          <TabsList className="w-full">
            <TabsTrigger value="work" className="grow">
              Pomodoro
            </TabsTrigger>
            <TabsTrigger value="shortBreak" className="grow">
              Break
            </TabsTrigger>
            <TabsTrigger value="longBreak" className="grow">
              Long Break
            </TabsTrigger>
          </TabsList>
          {states.map((state) => (
            <TabsContent key={state} value={state}>
              <div className="flex flex-col items-center">
                <time className="mb-8 mt-6 font-geist-mono text-8xl">
                  {currentState === state
                    ? `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
                    : `${timeToMinutes(pomodoroConfig[state].time).toString().padStart(2, "0")}:${timeToSeconds(pomodoroConfig[state].time).toString().padStart(2, "0")}`}
                </time>
                <div className="flex gap-x-4">
                  {!isRunning && currentState === state && (
                    <Button onClick={() => handleStart(state)}>Start</Button>
                  )}

                  {isRunning && currentState === state && (
                    <Button onClick={handleStop}>Pause</Button>
                  )}

                  {currentState !== state && (
                    <Button onClick={() => handleStart(state)}>Start</Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    disabled={currentState !== state}
                    className="[&_svg]:size-6"
                  >
                    <TimerResetIcon />
                  </Button>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}