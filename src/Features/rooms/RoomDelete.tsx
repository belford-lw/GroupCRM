import React from "react";

interface Room {
  id: number;
  roomName: string;
  teacher: string;
  studentsCount: number;
  startTime: string;
  endTime: string;
}

interface RoomDeleteProps {
  roomId: number;
  rooms: Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
}

const RoomDelete: React.FC<RoomDeleteProps> = ({ roomId, rooms, setRooms }) => {
  const handleDelete = () => {
    if (window.confirm("Are you sure?")) {
      setRooms(rooms.filter((r) => r.id !== roomId));
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
    >
      Delete
    </button>
  );
};

export default RoomDelete;