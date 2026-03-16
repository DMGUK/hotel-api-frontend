import { useState } from "react";
import RoomList from "./components/RoomList";
import ReservationForm from "./components/ReservationForm";
import ReservationList from "./components/ReservationList";

function App() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const handleBookingSuccess = () => {
    setSelectedRoom(null);
    setRefresh(r => r + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 tracking-tight">Hotel Reservation</h1>
            <p className="text-sm text-gray-400 mt-0.5">Room management & bookings</p>
          </div>
          <span className="text-xs font-medium bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
            Admin Panel
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 flex flex-col gap-12">
        {selectedRoom ? (
          <ReservationForm
            room={selectedRoom}
            onSuccess={handleBookingSuccess}
            onCancel={() => setSelectedRoom(null)}
          />
        ) : (
          <RoomList onSelectRoom={setSelectedRoom} />
        )}
        <ReservationList refresh={refresh} />
      </main>
    </div>
  );
}

export default App;