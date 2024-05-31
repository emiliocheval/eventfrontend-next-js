"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [sortKey, setSortKey] = useState("date"); // Default sorting by date

  // Fetch events from API
  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/event");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      // Filter out past events
      const currentDate = new Date();
      const upcomingEvents = data.filter(event => new Date(event.date) >= currentDate);

      setEvents(upcomingEvents);
    } catch (error) {
      console.log("Error fetching data:", error);
      setError("Failed to load events. Please try again later.");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Sort events based on sortKey
  const sortedEvents = [...events].sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "location") {
      return a.location.localeCompare(b.location);
    }
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-black mb-8">Available Events</h1>

      {/* Sorting controls */}
      <div className="mb-4">
        <label className="mr-2 text-black">Sort by:</label>
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          className="bg-white border text-black border-gray-300 rounded p-2"
        >
          <option value="date">Date</option>
          <option value="location">Location</option>
        </select>
      </div>

      {error ? (
        <div className="text-red-500 mb-8">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedEvents.map((event) => {
            const isFullBooked = event.bookedUsers.length >= event.numberOfSeats;
            return (
              isFullBooked ? (
                <div
                  key={event.id}
                  className="bg-gray-200 rounded-lg shadow-lg overflow-hidden cursor-not-allowed relative"
                >
                  {event.imageUrl ? (
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Fullbooked</span>
                  </div>
                  <div className="p-4">
                    <div className="text-lg text-black font-semibold">{event.title}</div>
                    <div className="text-gray-700">{new Date(event.date).toLocaleDateString()}</div>
                    <div className="text-gray-700">{event.location}</div>
                  </div>
                </div>
              ) : (
                <Link key={event.id} href={`/event/${event.id}`}>
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer">
                    {event.imageUrl ? (
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                    <div className="p-4">
                      <div className="text-lg text-black font-semibold">{event.title}</div>
                      <div className="text-gray-700">{new Date(event.date).toLocaleDateString()}</div>
                      <div className="text-gray-700">{event.location}</div>
                    </div>
                  </div>
                </Link>
              )
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EventPage;
