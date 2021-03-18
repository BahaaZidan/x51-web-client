import { useContext } from "react";
import SocketContext from "../contexts/Socket";

const useSockets = () => useContext(SocketContext);

export default useSockets;
