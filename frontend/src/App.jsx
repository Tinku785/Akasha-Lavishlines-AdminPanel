import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewBooking from './pages/NewBooking';
import Bookings from './pages/Bookings';
import { getBookings, createBooking, updateBooking, cancelBooking } from './services/api';

// Wrap Layout to use navigation hooks inside it
const LayoutWithNavigation = ({ children, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
        user={{ name: "Admin Staff" }}
        onLogout={onLogout}
      />
      <div className="flex-1 flex flex-col h-full w-full relative overflow-hidden">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-auto p-4 lg:p-8 relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-100/40 to-transparent rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
          <div className="relative z-10 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

function App() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const { data } = await getBookings();
      // Normalize backend data to frontend structure
      const normalized = data.map(b => ({
        id: b.bookingId || b._id,
        name: b.mainPassengerName,
        phone: b.phone,
        route: b.route,
        date: b.journeyDate,
        seat: b.passengers && b.passengers[0] ? b.passengers[0].seat : '',
        fare: b.totalFare,
        departure: b.departureTime,
        arrival: b.arrivalTime,
        status: b.status || 'Confirmed'
      }));
      setBookings(normalized);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount (and optionally when we know something changed)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchBookings();
    }
  }, []);

  const handleAddBooking = async (newBookingData) => {
    try {
      // Generate ID for display and tracking (or let backend do it, but we need it returned)
      // Here we generate it to keep consistent with previous mock logic
      const id = `BK${Math.floor(1000 + Math.random() * 9000)}`;

      const bookingPayload = {
        bookingId: id,
        mainPassengerName: newBookingData.name,
        phone: newBookingData.phone,
        journeyDate: newBookingData.date,
        route: newBookingData.route,
        departureTime: newBookingData.departure,
        arrivalTime: newBookingData.arrival,
        totalFare: newBookingData.fare,
        passengers: [{
          name: newBookingData.name,
          seat: newBookingData.seat,
          fare: newBookingData.fare
        }],
        status: 'Confirmed'
      };

      await createBooking(bookingPayload);
      await fetchBookings(); // Refresh list
      return id;
    } catch (error) {
      console.error("Create failed", error);
      throw error; // Re-throw so NewBooking can catch it
    }
  };

  const handleUpdateBooking = async (id, updatedFields) => {
    try {
      // Map frontend fields to backend schema
      const payload = {};
      if (updatedFields.name) payload.mainPassengerName = updatedFields.name;
      if (updatedFields.phone) payload.phone = updatedFields.phone;
      if (updatedFields.route) payload.route = updatedFields.route;
      if (updatedFields.date) payload.journeyDate = updatedFields.date;
      if (updatedFields.departure) payload.departureTime = updatedFields.departure;
      if (updatedFields.arrival) payload.arrivalTime = updatedFields.arrival;
      if (updatedFields.fare) payload.totalFare = updatedFields.fare;
      if (updatedFields.status) payload.status = updatedFields.status;

      // Handle nested passengers? 
      // For simple update, if seat or name changed, update array
      if (updatedFields.seat || updatedFields.name || updatedFields.fare) {
        payload.passengers = [{
          name: updatedFields.name || updatedFields.mainPassengerName, // fallback
          seat: updatedFields.seat,
          fare: updatedFields.fare || updatedFields.totalFare
        }];
      }

      await updateBooking(id, payload);
      await fetchBookings();
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update booking");
    }
  };

  const handleCancelBooking = async (id) => {
    try {
      await cancelBooking(id);
      await fetchBookings();
    } catch (error) {
      console.error("Cancel failed", error);
      alert("Failed to cancel booking");
    }
  };

  return (
    <BrowserRouter>
      <AppContent
        bookings={bookings}
        loading={loading}
        addBooking={handleAddBooking}
        updateBooking={handleUpdateBooking}
        cancelBooking={handleCancelBooking}
        refreshBookings={fetchBookings}
      />
    </BrowserRouter>
  );
}

// Separate component to use useNavigate 
const AppContent = ({ bookings, loading, addBooking, updateBooking, cancelBooking, refreshBookings }) => {
  const navigate = useNavigate();

  // If we are on a protected route and not logged in, should redirect
  // But for now, simple logout logic
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

  // Effect to trigger fetch if we just logged in?
  // Actually App holds the state, so App needs to know when to fetch.
  // We can pass refreshBookings to Login or just rely on App re-rendering or user navigating.
  // Since App mounts once, useEffect [] runs once.
  // If we login, we remain in App. We might need to trigger a fetch.

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      refreshBookings();
    } else if (window.location.pathname !== '/') {
      // If not login page and no token, redirect
      navigate('/');
    }
  }, [navigate]);

  if (loading && localStorage.getItem("token")) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/dashboard" element={
        <LayoutWithNavigation onLogout={handleLogout}>
          <Dashboard bookings={bookings} />
        </LayoutWithNavigation>
      } />

      <Route path="/new-booking" element={
        <LayoutWithNavigation onLogout={handleLogout}>
          <NewBooking onAddBooking={addBooking} />
        </LayoutWithNavigation>
      } />

      <Route path="/bookings" element={
        <LayoutWithNavigation onLogout={handleLogout}>
          <Bookings
            bookings={bookings}
            onUpdateBooking={updateBooking}
            onCancelBooking={cancelBooking}
          />
        </LayoutWithNavigation>
      } />
    </Routes>
  );
}

export default App;
