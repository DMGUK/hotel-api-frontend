import { useEffect, useState } from "react";

export default function ReservationList({ refresh }) {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5138/api/reservations")
      .then(res => res.json())
      .then(data => setReservations(data));
  }, [refresh]);

  const handleCancel = async id => {
    if (!window.confirm("Cancel this reservation?")) return;
    await fetch(`http://localhost:5138/api/reservations/${id}`, { method: "DELETE" });
    setReservations(prev => prev.filter(r => r.id !== id));
  };

  if (reservations.length === 0)
    return <p className="text-gray-500 text-sm mt-2">No reservations yet.</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Current Reservations</h2>
      <div className="flex flex-col gap-3">
        {reservations.map(r => (
          <div key={r.id} className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-800">{r.guestName}
                <span className="ml-2 text-sm font-normal text-gray-500">{r.guestEmail}</span>
              </p>
              <p className="text-sm text-gray-600">
                Room {r.room.roomNumber} ({r.room.type}) — {new Date(r.checkIn).toLocaleDateString()} to {new Date(r.checkOut).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => handleCancel(r.id)}
              className="bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium px-3 py-1.5 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}