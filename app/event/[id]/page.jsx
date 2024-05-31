"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs"; // Import Clerk's useAuth and useUser hooks
import { toast, ToastContainer } from "react-toastify"; // Import toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications

const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isBooked, setIsBooked] = useState(false); // Add state to track booking status
  const { getToken } = useAuth(); // Use Clerk's useAuth hook to get getToken
  const { user } = useUser(); // Use Clerk's useUser hook to get the current user

  // Fetch event data based on the extracted ID
  const fetchEvent = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/event/${id}`);
      const data = await response.json();
      setEvent(data);
      if (user && data.bookedUsers.includes(user.id)) { // Check if the user is already booked
        setIsBooked(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (id && user) {
      fetchEvent();
    }
  }, [id, user]);

  // Function to handle event booking
  const handleSignUpEventButton = async () => {
    try {
      const token = await getToken();
      const response = await fetch("http://localhost:8080/api/event/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Fix interpolation
        },
        body: JSON.stringify({ eventId: id }),
      });
      const data = await response.json();
      console.log("Event booked successfully:", data);
      setIsBooked(true); // Update booking status
      toast.success("Event booked!");
      fetchEvent(); // Refresh event data to update available seats
    } catch (error) {
      console.error("Error booking event:", error);
      toast.error("Failed to book event.");
    }
  };

  // Function to handle event unbooking
  const handleCancelBookingButton = async () => {
    try {
      const token = await getToken();
      const response = await fetch("http://localhost:8080/api/event/removeBooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Fix interpolation
        },
        body: JSON.stringify({ eventId: id }),
      });
      const data = await response.json();
      console.log("Event booking canceled successfully:", data);
      setIsBooked(false); // Update booking status
      toast.success("Booking canceled!");
      fetchEvent(); // Refresh event data to update available seats
    } catch (error) {
      console.error("Error canceling booking:", error);
      toast.error("Failed to cancel booking.");
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  const availableSeats = event.numberOfSeats - event.bookedUsers.length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <ToastContainer /> {/* Add ToastContainer here */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl w-full">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-8">
          <h1 className="text-3xl font-bold text-black mb-4">{event.title}</h1>
          <div className="text-gray-700 mb-4">
            <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
          </div>
          <div className="text-gray-700 mb-4">
            <strong>Location:</strong> {event.location}
          </div>
          <div className="text-gray-700 mb-4">
            <strong>Description:</strong> {event.description}
          </div>
          <div className="text-gray-700 mb-4">
            <strong>Available Seats:</strong> {availableSeats}
          </div>
          {!isBooked && ( // Render button only if not already booked
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600"
              onClick={handleSignUpEventButton}
            >
              Sign Up for Event
            </button>
          )}
          {isBooked && (
            <button
              className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-600"
              onClick={handleCancelBookingButton}
            >
              Cancel Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
