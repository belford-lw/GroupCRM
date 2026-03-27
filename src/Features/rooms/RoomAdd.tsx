import React, { useState } from "react";

interface Room {
  id: number;
  roomName: string;
  teacher: string;
  studentsCount: number;
  time: string;
}

interface Props {
  rooms: Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
}

const timeOptions = ["8:00-10:00", "10:00-12:00", "14:00-16:00", "16:00-18:00"];

const RoomAdd: React.FC<Props> = ({ rooms, setRooms }) => {
  const [showModal, setShowModal] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [studentsCount, setStudentsCount] = useState<number>(0);
  const [time, setTime] = useState("");

  const resetForm = () => {
    setRoomName("");
    setTeacher("");
    setStudentsCount(0);
    setTime("");
  };

  const handleSave = () => {
    if (!roomName || !teacher || !time || studentsCount <= 0) return;

    setRooms([
      ...rooms,
      { id: Date.now(), roomName, teacher, studentsCount, time },
    ]);
    resetForm();
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="mb-4 px-6 py-2 bg-green-600 rounded hover:bg-green-700"
      >
        Add Room
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded w-96 text-gray-100">
            <h2 className="text-2xl font-bold mb-4">Add Room</h2>

            <input
              type="text"
              placeholder="Room Name"
              className="w-full mb-2 px-4 py-2 rounded bg-gray-800 border border-gray-700"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Teacher Name"
              className="w-full mb-2 px-4 py-2 rounded bg-gray-800 border border-gray-700"
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
            />
            <input
              type="number"
              placeholder="Students Count"
              className="w-full mb-2 px-4 py-2 rounded bg-gray-800 border border-gray-700"
              value={studentsCount > 0 ? studentsCount : ""}
              onChange={(e) => setStudentsCount(Number(e.target.value))}
            />
            <select
              className="w-full mb-4 px-4 py-2 rounded bg-gray-800 border border-gray-700"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              <option value="">Select Time</option>
              {timeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => { setShowModal(false); resetForm(); }}
                className="px-4 py-2 border rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomAdd;
