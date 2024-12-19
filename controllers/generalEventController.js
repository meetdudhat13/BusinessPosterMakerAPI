const UpcomingEvent = require('../models/generalEventModel');

// Create a new upcoming event
const createUpcomingEvent = async (req, res) => {
    try {
        const { id, title, category, imageUrl, description, tags, timestamp, language } = req.body;
        const newEvent = new UpcomingEvent({
            id, title, category, imageUrl, description, tags, timestamp, language
        });
        await newEvent.save();
        res.status(201).json({
            status: 'success',
            message: 'Event created successfully.',
            data: newEvent,
            error: null,
            timestamp: new Date().toISOString()
        });  
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error creating event.',
            error: {
                code: 'INTERNAL_SERVER_ERROR',
                details: error.message
            },
            timestamp: new Date().toISOString()
        });
    }
};

// Get all upcoming events
const getUpcomingEvents = async (req, res) => {
    try {
        const event = await UpcomingEvent.find();
        res.status(200).json({
            status: 'success',
            message: 'Events fetched successfully.',
            data: {
                event,
                pagination: {
                    current_page: 1,
                    total_pages: 1,  // Update this if you implement pagination
                    total_items: event.length,
                    items_per_page: event.length
                }
            },
            error: null,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error fetching events.',
            error: {
                code: 'INTERNAL_SERVER_ERROR',
                details: error.message
            },
            timestamp: new Date().toISOString()
        });
    }
};

// Get a single upcoming event by ID
const getUpcomingEventById = async (req, res) => {
    try {
        const event = await UpcomingEvent.find(req.params);
        if (!event) {
            return res.status(404).json({
                status: 'error',
                message: 'Event not found.',
                error: {
                    code: 'NOT_FOUND',
                    details: 'Event with the given ID not found.'
                },
                timestamp: new Date().toISOString()
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Event fetched successfully.',
            data: event,
            error: null,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error fetching event.',
            error: {
                code: 'INTERNAL_SERVER_ERROR',
                details: error.message
            },
            timestamp: new Date().toISOString()
        });
    }
};

// Update an upcoming event
const updateUpcomingEvent = async (req, res) => {
  
    try {
        const updatedEvent = await UpcomingEvent.updateOne(
            req.params,
            req.body,
            { new: true }
        );
        if (!updatedEvent) {
            return res.status(404).json({
                status: 'error',
                message: 'Event not found.',
                error: {
                    code: 'NOT_FOUND',
                    details: 'Event with the given ID not found.'
                },
                timestamp: new Date().toISOString()
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Event updated successfully.',
            data: updatedEvent,
            error: null,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error updating event.',
            error: {
                code: 'INTERNAL_SERVER_ERROR',
                details: error.message
            },
            timestamp: new Date().toISOString()
        });
    }
};

// Delete an upcoming event
const deleteUpcomingEvent = async (req, res) => {
   
    try {
        const deletedEvent = await UpcomingEvent.deleteOne(req.params);
        if (!deletedEvent) {
            return res.status(404).json({
                status: 'error',
                message: 'Event not found.',
                error: {
                    code: 'NOT_FOUND',
                    details: 'Event with the given ID not found.'
                },
                timestamp: new Date().toISOString()
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Event deleted successfully.',
            data: null,
            error: null,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error deleting event.',
            error: {
                code: 'INTERNAL_SERVER_ERROR',
                details: error.message
            },
            timestamp: new Date().toISOString()
        });
    }
};



const searchGeneralEventByTitle = async (req, res) => {
    try {
      const { title } = req.query;
  
      if (!title) {
        return res.status(400).json({
          status: "error",
          message: "Title query parameter is required.",
          error: {
            code: "BAD_REQUEST",
            details: "The 'title' query parameter is missing.",
          },
          timestamp: new Date().toISOString(),
        });
      }
  
      const event = await UpcomingEvent.find({
        title: { $regex: title, $options: "i" },
      });
  
      res.status(200).json({
        status: "success",
        message: "Event fetched successfully.",
        data: {
          event,
          pagination: {
            current_page: 1,
            total_pages: 1, // Update this if you implement pagination
            total_items: event.length,
            items_per_page: event.length,
          },
        },
        error: null,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error fetching events by title.",
        error: {
          code: "INTERNAL_SERVER_ERROR",
          details: error.message,
        },
        timestamp: new Date().toISOString(),
      });
    }
  };
  
  const searchGeneralEventByCategory = async (req, res) => {
    try {
      const { category } = req.query;
  
      if (!category) {
        return res.status(400).json({
          status: "error",
          message: "Category query parameter is required.",
          error: {
            code: "BAD_REQUEST",
            details: "The 'category' query parameter is missing.",
          },
          timestamp: new Date().toISOString(),
        });
      }
  
      const event = await UpcomingEvent.find({
        category: { $regex: category, $options: "i" },
      });
  
      res.status(200).json({
        status: "success",
        message: "Event fetched successfully.",
        data: {
          event,
          pagination: {
            current_page: 1,
            total_pages: 1, // Update this if you implement pagination
            total_items: event.length,
            items_per_page: event.length,
          },
        },
        error: null,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error fetching events by category.",
        error: {
          code: "INTERNAL_SERVER_ERROR",
          details: error.message,
        },
        timestamp: new Date().toISOString(),
      });
    }
  };
  
  const searchGeneralEventCombined = async (req, res) => {
    try {
      const { query } = req.query;
  
      if (!query) {
        return res.status(400).json({
          status: "error",
          message: "Query parameter is required for combined search.",
          error: {
            code: "BAD_REQUEST",
            details: "The 'query' parameter is missing.",
          },
          timestamp: new Date().toISOString(),
        });
      }
  
      const event = await UpcomingEvent.find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
          { category: { $regex: query, $options: "i" } },
          { tags: { $regex: query, $options: "i" } },
        ],
      });
  
      res.status(200).json({
        status: "success",
        message: "Event fetched successfully.",
        data: {
          event,
          pagination: {
            current_page: 1,
            total_pages: 1, // Update this if you implement pagination
            total_items: event.length,
            items_per_page: event.length,
          },
        },
        error: null,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error fetching events.",
        error: {
          code: "INTERNAL_SERVER_ERROR",
          details: error.message,
        },
        timestamp: new Date().toISOString(),
      });
    }
  };



module.exports = {
    createUpcomingEvent,
    getUpcomingEvents,
    getUpcomingEventById,
    updateUpcomingEvent,
    deleteUpcomingEvent,
    searchGeneralEventByTitle,
    searchGeneralEventByCategory,
    searchGeneralEventCombined
};
