import { useState } from "react";

export default function ReservationForm({ room, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    guestName: "",
    guestEmail: "",
    checkIn: "",
    checkOut: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("http://localhost:5138/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, roomId: room.id }),
    });

    setLoading(false);

    if (res.ok) {
      onSuccess();
    } else {
      const data = await res.json();
      setError(data.message || "Something went wrong.");
    }
  };

  return (
    <div className="max-w-lg mx-auto w-full">
      <button
        onClick={onCancel}
        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mb-6 transition-colors"
      >
        ← Back to rooms
      </button>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="mb-6 pb-5 border-b border-gray-100">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Booking</p>
          <h2 className="text-xl font-semibold text-gray-900">Room {room.roomNumber}</h2>
          <p className="text-sm text-gray-400 mt-0.5">{room.type} · ${room.pricePerNight}/night</p>
        </div>

        {error && (
          <div className="mb-5 flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
            <span className="mt-0.5">⚠</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
                Guest name
              </label>
              <input
                name="guestName"
                value={form.guestName}
                onChange={handleChange}
                required
                placeholder="John Smith"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
                Email
              </label>
              <input
                name="guestEmail"
                type="email"
                value={form.guestEmail}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
                Check-in
              </label>
              <input
                name="checkIn"
                type="datetime-local"
                value={form.checkIn}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
                Check-out
              </label>
              <input
                name="checkOut"
                type="datetime-local"
                value={form.checkOut}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gray-900 hover:bg-gray-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-40 text-sm"
            >
              {loading ? "Confirming..." : "Confirm booking"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium py-2.5 rounded-lg transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}