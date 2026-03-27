import React, { useState } from "react";
import RoomAdd from "../Features/rooms/RoomAdd";
import RoomEdit from "../Features/rooms/RoomEdit";
import RoomDelete from "../Features/rooms/RoomDelete";

interface Room {
  id: number;
  roomName: string;
  teacher: string;
  studentsCount: number;
  time: string; 
}

const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-gray-100">
      <h1 className="text-4xl font-bold mb-6">Room Scheduler</h1>


      <RoomAdd rooms={rooms} setRooms={setRooms} />

      {rooms.length === 0 ? (
        <p className="text-gray-400">No rooms yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700 border border-gray-700 rounded-lg">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left">Room</th>
                <th className="px-6 py-3 text-left">Teacher</th>
                <th className="px-6 py-3 text-left">Students</th>
                <th className="px-6 py-3 text-left">Time</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-700">
              {rooms.map((room) => (
                <tr key={room.id} className="hover:bg-gray-800 transition">
                  <td className="px-6 py-4">{room.roomName}</td>
                  <td className="px-6 py-4">{room.teacher}</td>
                  <td className="px-6 py-4">{room.studentsCount}</td>
                  <td className="px-6 py-4">{room.time}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => setEditingRoom(room)}
                      className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <RoomDelete
                      roomId={room.id}
                      rooms={rooms}
                      setRooms={setRooms}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

     
      {editingRoom && (
        <RoomEdit
          room={editingRoom}
          setRooms={setRooms}
          closeEdit={() => setEditingRoom(null)}
        />
      )}
    </div>
  );
};

export default Rooms;
