import { useSyncExternalStore, useMemo } from "react";

function dispatchStorageEvent(key: string, newValue: string) {
  window.dispatchEvent(new StorageEvent("storage", { key, newValue }));
}

function setLocalStorageItem(key: string, value: unknown) {
  const stringifiedValue = JSON.stringify(value);
  localStorage.setItem(key, stringifiedValue);
  dispatchStorageEvent(key, stringifiedValue);
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

type Setter<T> = (value: T) => void;

export function useLocalStorage<T>(key: string, initialValue: T): [T, Setter<T>];
export function useLocalStorage<T>(key: string): [T | null, Setter<T>];
export function useLocalStorage<T>(key: string, initialValue?: T) {
  function getSnapshot() {
    return localStorage.getItem(key);
  }

  function setItem(value: T) {
    setLocalStorageItem(key, value);
  }

  useMemo(() => {
    if (initialValue !== undefined) {
      const item = localStorage.getItem(key);
      if (item === null) {
        setLocalStorageItem(key, initialValue);
      }
    }
  }, [key, initialValue]);

  const item = useSyncExternalStore(subscribe, getSnapshot);

  return [item ? JSON.parse(item) : item, setItem];
}
