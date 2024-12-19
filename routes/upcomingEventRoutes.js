const express = require("express");
const {
  createUpcomingEvent,
  getUpcomingEvents,
  getUpcomingEventById,
  updateUpcomingEvent,
  deleteUpcomingEvent,
  searchUpcomingEventByTitle,
  searchUpcomingEventByCategory,
  searchUpcomingEventCombined
} = require("../controllers/upcomingEventController");
const router = express.Router();

router.post("/upcoming-events", createUpcomingEvent);
router.get("/upcoming-events", getUpcomingEvents);
router.get("/upcoming-events/:id", getUpcomingEventById);
router.put("/upcoming-events/:id", updateUpcomingEvent);
router.delete("/upcoming-events/:id", deleteUpcomingEvent);
router.get('/upcoming-events/search/title', searchUpcomingEventByTitle);
router.get('/upcoming-events/search/category', searchUpcomingEventByCategory);
router.get('/upcoming-events/search/combined', searchUpcomingEventCombined);

module.exports = router;
