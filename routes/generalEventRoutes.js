const express = require("express");
const {
  createUpcomingEvent,
  getUpcomingEvents,
  getUpcomingEventById,
  updateUpcomingEvent,
  deleteUpcomingEvent,
  searchGeneralEventByTitle,
  searchGeneralEventByCategory,
  searchGeneralEventCombined
} = require("../controllers/generalEventController");
const router = express.Router();

router.post("/general-events", createUpcomingEvent);
router.get("/general-events", getUpcomingEvents);
router.get("/general-events/:id", getUpcomingEventById);
router.put("/general-events/:id", updateUpcomingEvent);
router.delete("/general-events/:id", deleteUpcomingEvent);
router.get('/general-events/search/title', searchGeneralEventByTitle);
router.get('/general-events/search/category', searchGeneralEventByCategory);
router.get('/general-events/search/combined', searchGeneralEventCombined);

module.exports = router;
