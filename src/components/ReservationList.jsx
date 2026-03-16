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

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Current Reservations</h2>
        <p className="text-sm text-gray-400 mt-0.5">
          {reservations.length === 0 ? "No active reservations" : `${reservations.length} active`}
        </p>
      </div>

      {reservations.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-200 rounded-xl px-6 py-10 text-center">
          <p className="text-gray-300 text-3xl mb-2">⊘</p>
          <p className="text-sm text-gray-400">No reservations yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {reservations.map(r => (
            <div
              key={r.id}
              className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center justify-between hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500 flex-shrink-0">
                  {r.room.roomNumber}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {r.guestName}
                    <span className="ml-2 font-normal text-gray-400 text-xs">{r.guestEmail}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {r.room.type} · {new Date(r.checkIn).toLocaleDateString()} → {new Date(r.checkOut).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleCancel(r.id)}
                className="text-xs font-medium text-gray-400 hover:text-red-500 border border-gray-200 hover:border-red-200 px-3 py-1.5 rounded-lg transition-colors ml-4 flex-shrink-0"
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}