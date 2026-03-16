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
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Rooms</h2>
        <p className="text-sm text-gray-400 mt-0.5">{rooms.length} rooms total</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map(room => (
          <div
            key={room.id}
            className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Room</p>
                <p className="text-2xl font-bold text-gray-800">{room.roomNumber}</p>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                room.isAvailable
                  ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                  : "bg-red-50 text-red-500 border-red-200"
              }`}>
                {room.isAvailable ? "Available" : "Reserved"}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-3">
              <span>{room.type}</span>
              <span className="font-semibold text-gray-700">${room.pricePerNight}<span className="font-normal text-gray-400">/night</span></span>
            </div>

            {room.isAvailable && (
              <button
                onClick={() => onSelectRoom(room)}
                className="w-full mt-1 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
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