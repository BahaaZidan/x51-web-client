import { useEffect, useState } from "react";
import useSockets from "./useSockets";

const useEvent = (name: string) => {
  const [eventValue, setEventValue] = useState<any>();
  const sockets = useSockets();

  const socket = sockets?.xoSocket; // TODO : should be generic

  useEffect(() => {
    socket?.on(name, (data) => {
      setEventValue(data);
    });

    return () => {
      socket?.off(name);
    };
  }, [socket]);

  return eventValue;
};

export default useEvent;
