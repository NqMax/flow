import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const permissions = navigator.permissions;

  permissions.query({ name: "notifications" }).then((result) => {
    result.addEventListener("change", callback);
  });

  return () =>
    permissions.query({ name: "notifications" }).then((result) => {
      result.removeEventListener("change", callback);
    });
}

function getSnapshot() {
  return Notification.permission;
}

export function useNotificationsPermission(): NotificationPermission {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot);

  return snapshot;
}
