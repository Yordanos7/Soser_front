import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CalendarDaysIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import api from "../../lib/axios";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events");
        if (response.data && response.data.events) {
          setEvents(response.data.events);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await api.delete(`/events/${id}`);
        setEvents(events.filter((event) => event.id !== id));
        alert("Event deleted successfully!");
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Failed to delete event.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Manage Events
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Review, update, and delete events.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {event.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {event.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600 text-sm">
                  <CalendarDaysIcon className="w-4 h-4 mr-2" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  <span>
                    {event.startTime} - {event.endTime}
                  </span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  <span className="truncate">{event.location}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <UserGroupIcon className="w-4 h-4 mr-2" />
                  <span>Capacity: {event.capacity}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button className="p-2 text-blue-600 hover:text-blue-800">
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageEvents;
