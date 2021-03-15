import { useContext } from "react";
import SocketContext from "../contexts/Socket";

const useSocket = () => useContext(SocketContext);

export default useSocket;
