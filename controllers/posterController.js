const Poster = require("../models/posterModel");

const addPoster = async (req, res) => {
  try {
    const {
      id,
      title,
      category,
      imageUrl,
      description,
      tags,
      timestamp,
      language,
    } = req.body;
    const newPoster = new Poster({
      id,
      title,
      category,
      imageUrl,
      description,
      tags,
      timestamp,
      language,
    });
    await newPoster.save();
    res.status(201).json({
      status: "success",
      message: "Poster created successfully.",
      data: newPoster,
      error: null,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error creating poster.",
      error: {
        code: "INTERNAL_SERVER_ERROR",
        details: error.message,
      },
      timestamp: new Date().toISOString(),
    });
  }
};

const getPosters = async (req, res) => {
  try {
    const posters = await Poster.find();
    res.status(200).json({
      status: "success",
      message: "Posters fetched successfully.",
      data: {
        posters,
        pagination: {
          current_page: 1,
          total_pages: 1, // Update this if you implement pagination
          total_items: posters.length,
          items_per_page: posters.length,
        },
      },
      error: null,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching posters.",
      error: {
        code: "INTERNAL_SERVER_ERROR",
        details: error.message,
      },
      timestamp: new Date().toISOString(),
    });
  }
};

const getPosterById = async (req, res) => {
  try {
    const poster = await Poster.find(req.params);
    if (!poster) {
      return res.status(404).json({
        status: "error",
        message: "Poster not found.",
        error: {
          code: "NOT_FOUND",
          details: "Poster with the given ID not found.",
        },
        timestamp: new Date().toISOString(),
      });
    }
    res.status(200).json({
      status: "success",
      message: "Poster fetched successfully.",
      data: poster,
      error: null,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching poster.",
      error: {
        code: "INTERNAL_SERVER_ERROR",
        details: error.message,
      },
      timestamp: new Date().toISOString(),
    });
  }
};

// Update a poster
const updatePoster = async (req, res) => {
  try {
    const updatedPoster = await Poster.updateOne(req.params, req.body, {
      new: true,
    });
    if (!updatedPoster) {
      return res.status(404).json({
        status: "error",
        message: "Poster not found.",
        error: {
          code: "NOT_FOUND",
          details: "Poster with the given ID not found.",
        },
        timestamp: new Date().toISOString(),
      });
    }
    res.status(200).json({
      status: "success",
      message: "Poster updated successfully.",
      data: updatedPoster,
      error: null,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error updating poster.",
      error: {
        code: "INTERNAL_SERVER_ERROR",
        details: error.message,
      },
      timestamp: new Date().toISOString(),
    });
  }
};

// Delete a poster
const deletePoster = async (req, res) => {
  try {
    const deletedPoster = await Poster.deleteOne(req.params);
    if (!deletedPoster) {
      return res.status(404).json({
        status: "error",
        message: "Poster not found.",
        error: {
          code: "NOT_FOUND",
          details: "Poster with the given ID not found.",
        },
        timestamp: new Date().toISOString(),
      });
    }
    res.status(200).json({
      status: "success",
      message: "Poster deleted successfully.",
      data: null,
      error: null,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error deleting poster.",
      error: {
        code: "INTERNAL_SERVER_ERROR",
        details: error.message,
      },
      timestamp: new Date().toISOString(),
    });
  }
};

const searchPosterByTitle = async (req, res) => {
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

    const posters = await Poster.find({
      title: { $regex: title, $options: "i" },
    });

    res.status(200).json({
      status: "success",
      message: "Posters fetched successfully.",
      data: {
        posters,
        pagination: {
          current_page: 1,
          total_pages: 1, // Update this if you implement pagination
          total_items: posters.length,
          items_per_page: posters.length,
        },
      },
      error: null,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching posters by title.",
      error: {
        code: "INTERNAL_SERVER_ERROR",
        details: error.message,
      },
      timestamp: new Date().toISOString(),
    });
  }
};

const searchPosterByCategory = async (req, res) => {
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

    const posters = await Poster.find({
      category: { $regex: category, $options: "i" },
    });

    res.status(200).json({
      status: "success",
      message: "Posters fetched successfully.",
      data: {
        posters,
        pagination: {
          current_page: 1,
          total_pages: 1, // Update this if you implement pagination
          total_items: posters.length,
          items_per_page: posters.length,
        },
      },
      error: null,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching posters by category.",
      error: {
        code: "INTERNAL_SERVER_ERROR",
        details: error.message,
      },
      timestamp: new Date().toISOString(),
    });
  }
};

const searchPosterCombined = async (req, res) => {
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

    const posters = await Poster.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json({
      status: "success",
      message: "Posters fetched successfully.",
      data: {
        posters,
        pagination: {
          current_page: 1,
          total_pages: 1, // Update this if you implement pagination
          total_items: posters.length,
          items_per_page: posters.length,
        },
      },
      error: null,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching posters.",
      error: {
        code: "INTERNAL_SERVER_ERROR",
        details: error.message,
      },
      timestamp: new Date().toISOString(),
    });
  }
};

module.exports = {
  addPoster,
  getPosters,
  getPosterById,
  updatePoster,
  deletePoster,
  searchPosterByTitle,
  searchPosterByCategory,
  searchPosterCombined,
};
