const express = require("express");
const Event = require("../models/Event");
const Registration = require("../models/Registration");
const volunteerInvitesSchema = require("../models/volunteerInvites");
const volunteerInvites = require("../models/volunteerInvites");
const volunteer = require("../models/volunteer");
const User = require("../models/User");
const { default: mongoose } = require("mongoose");
const VolunteerTotalCheckedIn = require("../models/VolunteerTotalCheckedIn");
const cloudinary = require("cloudinary").v2;

async function uploadImage(filepath) {
  const response = await cloudinary.uploader.upload(filepath, {
    folder: "event managenet",
    resource_type: "image",
    quality: "auto",
    fetch_format: "auto",
  });
  return response;
}

exports.createEventController = async (req, res) => {
  try {
    const { id } = req.user;
    const poster = req.files.poster;

    const {
      titel,
      description,
      eventDate,
      duration,
      time,
      location,
      maxParticpants,
      category,
    } = req.body;

    const startDateTime = new Date(`${eventDate}T${time}:00+05:30`);

    const image = await uploadImage(poster.tempFilePath);

    console.log("after cloudinary");
    const saveEvent = await Event.create({
      titel,
      description,
      eventDate: startDateTime.toISOString(),
      time,
      location,
      maxParticpants,
      createdBy: id,
      duration,
      poster: {
        url: image.url,
        publicID: image.public_id,
      },
      admin: id,
      volunteer: false,
      category,
    });

    res.status(201).json({
      success: true,
      message: "event cerated successfully",
      saveEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error in creating event",
      error: error.message,
    });
  }
};

exports.ViewMyEventsController = async (req, res) => {
  try {
    const { id } = req.user;
    const events = await Event.find({ admin: id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    console.log("error in view my event controller : ", error.message);
    res.status(500).json({
      success: false,
      message: "not able to fetch events",
      error: error.message,
    });
  }
};

exports.deleteEventController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id is unknown which event to delete",
      });
    }
    const deleteEvent = await Event.findByIdAndDelete(id);
    cloudinary.uploader.destroy(deleteEvent.poster.publicID);

    if (!deleteEvent) {
      return res.status(404).json({
        success: false,
        message: "event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
      deleteEvent,
    });
  } catch (error) {
    console.log("error in delete controller", error.message);
    return res.status(500).json({
      success: false,
      message: "error while deleteing event",
      error: error.message,
    });
  }
};

exports.viewRegsiteredUser = async (req, res) => {
  try {
    const eventID = req.params.id;
    if (!eventID) {
      return res.status(400).json({
        success: false,
        message: "Invalid eventID",
      });
    }
    const registerUsers = await Registration.find({ event: eventID })
      .populate("user")
      .populate("event");

    if (!registerUsers) {
      return res.status(403).json({
        success: false,
        message: "their is no user 0 registartion",
      });
    }

    res.status(200).json({
      success: true,
      message: "all users",
      registerUsers,
    });
  } catch (error) {
    console.log("error in fetching registered user handler  : ", error.message);
    res.status(500).json({
      success: false,
      message: "error in fetching registered users",
      error: error.message,
    });
  }
};

exports.updateEventController = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id is not valid",
      });
    }
    const UpdatedEvent = await Event.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      message: "event is updated",
      UpdatedEvent,
    });
  } catch (error) {
    console.log("error in update handler", error.message);
    res.status(500).json({
      success: false,
      message: "error in update handler",
      error: error,
    });
  }
};

exports.addVoluenters = async (req, res) => {
  try {
    const { id } = req.user;
    const event = req.params.id;
    const { maxVolunteers, time } = req.body;
    if (!event || maxVolunteers == null || time == null) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields.",
      });
    }
    if (maxVolunteers <= 0 || time <= 0) {
      return res.status(400).json({
        success: false,
        message: "time and maximum participants cannot be 0 or lesst the 0",
      });
    }

    const isVolunteerAlreadyAssign = await volunteer.findOne({ event });

    if (isVolunteerAlreadyAssign) {
      return res.status(400).json({
        success: true,
        message:
          "voluenters are already assigned for this event if you want to assgin new first you have to delete previously assigned voulenteers",
      });
    }
    const token = crypto.randomUUID();
    const link = `${process.env.BASE_URL}/user/join/${event}/${token}`;

    const saveData = await volunteerInvites.create({
      event,
      token,
      maxVolunteers,
      expiresAt: new Date(Date.now() + time * 60 * 1000),
      createdBy: id,
    });
    res.status(200).json({
      success: true,
      message: "invitation link is fetched successfully",
      link,
    });
  } catch (error) {
    console.log("error in addvoluenteer ", error.message);
    res.status(500).json({
      success: false,
      message: "somehting went wrong while fetching volunteer link ",
      error: error.message,
    });
  }
};

exports.deleteVoluentersController = async (req, res) => {
  try {
    const event = req.params.id;
    const deletedVolunteer = await volunteer.findOneAndDelete(event, {
      returnDocument: "after",
    });
    if (!deletedVolunteer) {
      return res.status(403).json({
        success: false,
        message: "their is no voluenters for this event ",
      });
    }
    console.log(deletedVolunteer);
    res.status(200).json({
      success: true,
      message: "all voluenteers are deleted now you can make new",
      deletedVolunteer,
    });
  } catch (error) {
    console.log("error in deleting voluenters", error.message);
    res.status(500).json({
      success: false,
      message: "not able to delete voulenters",
      error: error.message,
    });
  }
};

exports.getEventController = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(400).json({
        success: false,
        message: "event not exits",
      });
    }
    res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error in get eventhandler",
    });
  }
};

exports.viewVolunteersController = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await volunteer.findOne({ event: id }).populate("volunteers");
    console.log(users);
    if (!users) {
      return res.status(400).json({
        success: false,
        message: "user does not exists",
      });
    }
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error in fethcing volunteers",
      error: error.message,
    });
  }
};

exports.checkedInUsersController = async (req, res) => {
  try {
    const eventId = req.params.id;
    const users = await Registration.find({
      event: eventId,
      status: "attended",
    }).populate("user");

    if (!users) {
      return res.status(400).json({
        success: false,
        message: "users not exists",
      });
    }
    res.status(200).json({
      success: true,
      message: "user fetched successfully",
      users,
    });
  } catch (error) {
    console.log("error in in viewing registered users : ", error.message);
    res.status(500).json({
      success: false,
      message: "error in fetching users",
    });
  }
};

exports.dashboardSummaryController = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) {
      res.status(400).json({
        success: false,
        message: "token expired please login again",
      });
    }

    const eventsIds = await Event.distinct("_id", {
      admin: id,
    });
    const registrationSummary = await Registration.aggregate([
      { $match: { event: { $in: eventsIds } } },
      {
        $group: {
          _id: null,
          totalRegisteredUsers: {
            $sum: 1,
          },
          totalAttendedUsers: {
            $sum: {
              $cond: [{ $eq: ["$status", "attended"] }, 1, 0],
            },
          },
        },
      },
    ]);

    const EventsSummary = await Event.aggregate([
      {
        $match: {
          admin: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $group: {
          _id: null,
          totalEvents: { $sum: 1 },
          completedEvents: {
            $sum: {
              $cond: [{ $lt: ["$eventDate", new Date()] }, 1, 0],
            },
          },
          upcomingEvents: {
            $sum: {
              $cond: [{ $gt: ["$eventDate", new Date()] }, 1, 0],
            },
          },
        },
      },
    ]);

    const volunteerSummary = await volunteer.aggregate([
      {
        $match: {
          event: { $in: eventsIds },
        },
      },

      {
        $lookup: {
          from: "events",
          localField: "event",
          foreignField: "_id",
          as: "eventDetails",
        },
      },

      {
        $unwind: "$eventDetails",
      },

      {
        $match: {
          $expr: {
            $and: [
              {
                $lte: ["$eventDetails.eventDate", "$$NOW"],
              },
              {
                $gte: [
                  {
                    $add: [
                      "$eventDetails.eventDate",
                      {
                        $multiply: ["$eventDetails.duration", 60 * 60 * 1000],
                      },
                    ],
                  },
                  "$$NOW",
                ],
              },
            ],
          },
        },
      },

      {
        $count: "totalVolunteers",
      },
    ]);

    const eventsRegistration = await Registration.aggregate([
      {
        $match: {
          event: { $in: eventsIds },
        },
      },

      {
        $lookup: {
          from: "events",
          localField: "event",
          foreignField: "_id",
          as: "eventDetails",
        },
      },

      {
        $unwind: "$eventDetails",
      },

      {
        $match: {
          $expr: {
            $gt: ["$eventDetails.eventDate", "$$NOW"],
          },
        },
      },

      {
        $group: {
          _id: "$event",

          name: {
            $first: "$eventDetails.titel",
          },
          maxParticpants: {
            $first: "$eventDetails.maxParticpants",
          },

          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const startDate = new Date();
    const topPerformingEvents = await Registration.aggregate([
      { $match: { event: { $in: eventsIds } } },

      {
        $lookup: {
          from: "events",
          localField: "event",
          foreignField: "_id",
          as: "eventsDetails",
        },
      },
      { $unwind: "$eventsDetails" },
      {
        $match: {
          "eventsDetails.eventDate": {
            $gte: startDate,
          },
        },
      },
      {
        $group: {
          _id: "$event",
          registrationCount: { $sum: 1 },
          eventName: {
            $first: "$eventsDetails.titel",
          },
          eventDate: {
            $first: "$eventsDetails.eventDate",
          },
        },
      },
      {
        $sort: {
          registrationCount: -1,
        },
      },
      { $limit: 3 },
    ]);

    const registrationObj = registrationSummary[0];
    const eventObj = EventsSummary[0];
    const volunteerObj = volunteerSummary[0];
    const dashboardSummary = {
      ...registrationObj,
      ...eventObj,
      ...volunteerObj,
    };
    res.status(200).json({
      success: true,
      dashboardSummary,
      eventsRegistration,
      topPerformingEvents,
    });
  } catch (error) {
    console.log("error while fetching dashoboard summary : ", error.message);
    res.status(500).json({
      success: false,
      message: "unable to fetch dashboard summary",
    });
  }
};

exports.topPerformingVolunteers = async (req, res) => {
  try {
    const { id } = req.user;
    const eventIds = await Event.distinct("_id", {
      admin: id,
    });

    const now = new Date();

    const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const volunteerSummary = await VolunteerTotalCheckedIn.aggregate([
      {
        $match: {
          event: {
            $in: eventIds,
          },
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "volunteer",
          foreignField: "_id",
          as: "volunteerDetails",
        },
      },
      {
        $unwind: "$volunteerDetails",
      },
      {
        $lookup: {
          from: "events",
          localField: "event",
          foreignField: "_id",
          as: "eventsDetails",
        },
      },
      {
        $unwind: "$eventsDetails",
      },
      {
        $match: {
          "eventsDetails.eventDate": {
            $lte: endDate,
            $gte: startDate,
          },
        },
      },
      {
        $group: {
          _id: "$volunteer",

          name: {
            $first: "$volunteerDetails.name",
          },

          profile: {
            $first: "$volunteerDetails.profile",
          },

          checkedIn: {
            $sum: {
              $size: {
                $ifNull: ["$users", []],
              },
            },
          },
        },
      },
      {
        $sort: {
          checkedIn: -1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      volunteerSummary,
    });
  } catch (error) {
    console.log("error in top volunteer handler : ", error.message);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.allActiveStreams = async (req, res) => {
  try {
    const { id } = req.user;
    const eventIds = await Event.distinct("_id", { admin: id });

    const registerUsers = await Registration.aggregate([
      { $match: { event: { $in: eventIds } } },
      {
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "user",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },

      {
        $lookup: {
          from: "events",
          foreignField: "_id",
          localField: "event",
          as: "eventDetails",
        },
      },
      { $unwind: "$eventDetails" },

      {
        $group: {
          _id: "$userDetails._id",
          name: {
            $first: "$userDetails.name",
          },
          eventName: {
            $first: "$eventDetails.titel",
          },
          status: {
            $first: "$status",
          },
          createdAt: { $max: "$createdAt" },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    res.status(200).json({
      success: true,
      registerUsers,
    });
  } catch (error) {
    console.log("error in activity handler : ", error.message);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.viewAllRegistration = async (req, res) => {
  try {
    const { id } = req.user;
    const eventIds = await Event.distinct("_id", {
      admin: id,
    });
    const AllRegistrations = await Registration.aggregate([
      { $match: { event: { $in: eventIds } } },
      {
        $lookup: {
          from: "events",
          localField: "event",
          foreignField: "_id",
          as: "eventDetails",
        },
      },
      { $unwind: "$eventDetails" },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      { $match: { "eventDetails.eventDate": { $gte: new Date() } } },
      { $sort: { createdAt: -1 } },
      {
        $project: {
          userDetails: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      AllRegistrations,
    });
  } catch (error) {
    console.log(
      "error while fetching all registration users : ",
      error.message,
    );
    res.status(500).json({
      success: false,
      message: "internal server error whil fetching all registered Users",
    });
  }
};

exports.SearchUser = async (req, res) => {
  try {
    const { id } = req.user;
    const query = req.query.query;
    console.log(query);
    if (!query) {
      return res.status(400).json({
        success: false,
        message: "please enter the value to be searched query is empty",
      });
    }
    const eventIds = await Event.distinct("_id", {
      admin: id,
    });
    const user = await Registration.aggregate([
      { $match: { event: { $in: eventIds } } },
      {
        $lookup: {
          from: "events",
          localField: "event",
          foreignField: "_id",
          as: "eventDetails",
        },
      },
      { $unwind: "$eventDetails" },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },

      {$match : {"eventDetails.eventDate" : {$gte : new Date()}}},
      {$match : {$or : [
        {"userDetails.name" : {$regex : query , $options : "i"} },
        {"userDetails.email" : {$regex : query , $options : "i"} },
      ]}}
    ]);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not exits",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("error while searching user", error.message);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
