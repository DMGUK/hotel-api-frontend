import { useEffect, useState } from "react";

export default function RoomList({ onSelectRoom }) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5138/api/rooms")
      .then(res => res.json())
      .then(data => setRooms(data));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Rooms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map(room => (
          <div key={room.id} className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-800">Room {room.roomNumber}</span>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                room.isAvailable
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}>
                {room.isAvailable ? "Available" : "Reserved"}
              </span>
            </div>
            <p className="text-gray-500 text-sm">{room.type}</p>
            <p className="text-gray-700 font-medium">${room.pricePerNight} / night</p>
            {room.isAvailable && (
              <button
                onClick={() => onSelectRoom(room)}
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition"
              >
                Book this room
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}