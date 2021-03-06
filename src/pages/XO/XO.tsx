import "./XO.css";
import React, { useEffect, useState } from "react";
import useSockets from "../../hooks/useSockets";
import * as eventNames from "../../eventNames";
import { useParams } from "react-router";
import CenteredContent from "../../templates/CenteredContent/CenteredContent";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";

const Slot = ({
  slot,
  move,
  onClick,
}: {
  slot: string;
  move: string;
  onClick: (...args: any) => () => void;
}) => (
  <div className={`slot ${slot}`} onClick={onClick(slot)}>
    <h3 className="slot_move">{move}</h3>
  </div>
);

const XO = () => {
  const [roomState, setRoomState] = useState<any>();
  const sockets = useSockets();
  const params = useParams<any>();

  const socket = sockets?.xoSocket;

  useEffect(() => {
    socket?.on(eventNames.GAME_STATE_CHANGED, (data) => {
      console.log(eventNames.GAME_STATE_CHANGED, data);
      setRoomState(data);
    });

    return () => {
      socket?.off(eventNames.GAME_STATE_CHANGED);
    };
  }, [socket]);

  useEffect(() => {
    socket?.emit(eventNames.PLAYER_JOIN_ROOM_EVENT, { room: params.roomID });

    return () => {};
  }, [socket, params.roomID]);

  const handleSlotClick = (slot: string) => () => {
    socket?.emit(eventNames.PLAYER_MOVED_EVENT, {
      room: params.roomID,
      data: { slot },
    });
  };

  const handleStartClick = () => {
    socket?.emit(eventNames.PLAYER_START_ROOM_EVENT, {
      room: params.roomID,
    });
  };

  const handleResetClick = () => {
    socket?.emit(eventNames.PLAYER_RESET_ROOM_EVENT, {
      room: params.roomID,
    });
  };

  return (
    <CenteredContent>
      <div className="XO">
        <h1>XO</h1>
        <ButtonGroup size="lg">
          <Button
            type="primary"
            disabled={roomState?.status !== "ready"}
            onClick={handleStartClick}
          >
            Start
          </Button>
          <Button
            type="success"
            disabled={roomState?.status !== "done"}
            onClick={handleResetClick}
          >
            Reset
          </Button>
        </ButtonGroup>
        <div className="slots_container">
          <div className="slots_row">
            <Slot
              slot="0-0"
              move={roomState?.gameState.slots["0-0"]}
              onClick={handleSlotClick}
            />
            <Slot
              slot="0-1"
              move={roomState?.gameState.slots["0-1"]}
              onClick={handleSlotClick}
            />
            <Slot
              slot="0-2"
              move={roomState?.gameState.slots["0-2"]}
              onClick={handleSlotClick}
            />
          </div>
          <div className="slots_row">
            <Slot
              slot="1-0"
              move={roomState?.gameState.slots["1-0"]}
              onClick={handleSlotClick}
            />
            <Slot
              slot="1-1"
              move={roomState?.gameState.slots["1-1"]}
              onClick={handleSlotClick}
            />
            <Slot
              slot="1-2"
              move={roomState?.gameState.slots["1-2"]}
              onClick={handleSlotClick}
            />
          </div>
          <div className="slots_row">
            <Slot
              slot="2-0"
              move={roomState?.gameState.slots["2-0"]}
              onClick={handleSlotClick}
            />
            <Slot
              slot="2-1"
              move={roomState?.gameState.slots["2-1"]}
              onClick={handleSlotClick}
            />
            <Slot
              slot="2-2"
              move={roomState?.gameState.slots["2-2"]}
              onClick={handleSlotClick}
            />
          </div>
        </div>
      </div>
    </CenteredContent>
  );
};

export default XO;
