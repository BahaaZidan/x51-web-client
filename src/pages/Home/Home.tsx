import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useHistory } from "react-router";
import useSockets from "../../hooks/useSockets";
import * as eventNames from "../../eventNames";

const games = [
  {
    key: "xo",
    name: "Tic Tac Toe",
    description: "XO",
  },
];

const Home = () => {
  const history = useHistory();
  const sockets = useSockets();
  const xoSocket = sockets?.xoSocket;

  const handleButtonClick = () => {
    xoSocket?.emit(eventNames.PLAYER_CREATE_ROOM_EVENT);
  };

  useEffect(() => {
    xoSocket?.once(eventNames.ROOM_CREATED_EVENT, ({ room }) => {
      history.push(`/g/xo/${room}`);
    });
  }, [xoSocket, history]);

  return (
    <div className="">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.key}>
              <td>{game.name}</td>
              <td>{game.description}</td>
              <td>
                <Button onClick={handleButtonClick} variant="primary" block>
                  New Game
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Home;
