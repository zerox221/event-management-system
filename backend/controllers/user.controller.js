const express = require("express");
const User = require("../models/User");
const Event = require("../models/Event");
const Registration = require("../models/Registration");
const qrCode = require("qrcode");
const sendQR = require("../services/SendQrCode");
const volunteerInvites = require("../models/volunteerInvites");
const volunteer = require("../models/volunteer");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const TotalCheckedIn = require("../models/VolunteerTotalCheckedIn");

exports.getUserController = async (req, res) => {
  try {
    const { id } = req.user;
    //search for user in db
    const checkUser = await User.findById(id);

    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "user not exists please login again",
      });
    }

    res.status(200).json({
      success: true,
      message: "user data is fetched successfully",
      user: {
        name: checkUser.name,
        email: checkUser.email,
        id: checkUser._id,
        role: checkUser.role,
        profile: checkUser.profile,
        additionalInfo: checkUser.additionalInfo,
      },
    });
  } catch (error) {
    console.log("error in getusercontroller : ", error.message);
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

exports.viewAllEventsController = async (req, res) => {
  try {
    const allEvents = await Event.find({
      eventDate: {
        $gte: new Date(),
      },
    }).sort({ createdAt: -1 });
    if (!allEvents) {
      return res.status(500).json({
        success: false,
        message: "thier is no event yet",
      });
    }
    res.status(200).json({
      success: true,
      message: "All events fetched successfully",
      allEvents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error in fetching events",
      error: error.message,
    });
  }
};

exports.registraionController = async (req, res) => {
  try {
    const eventID = req.params.id;
    const userID = req.user.id;

    if (!eventID || !userID) {
      return res.status(401).json({
        success: false,
        message: "please enter all the fields",
      });
    }

    const checkEvent = await Event.findById(eventID);

    if (!checkEvent) {
      return res.status(403).json({
        success: false,
        meddage: "their is no event with this id",
      });
    }

    if (checkEvent.participants >= checkEvent.maxParticipants) {
      return res.status(400).json({
        success: false,
        message: "Event is full. There are no seats left.",
      });
    }

    const alreadyRegistered = await Registration.findOne({
      user: req.user.id,
      event: eventID,
    });

    if (alreadyRegistered) {
      return res.status(400).json({
        success: false,
        message: "user already registered",
      });
    }

    const saveRegistration = await Registration.create({
      event: eventID,
      user: userID,
      status: "registered",
    });

    const QRCODE = await qrCode.toDataURL(saveRegistration._id.toString());

    await Event.findByIdAndUpdate(eventID, {
      $inc: {
        participants: 1,
      },
    });

    const registration = await Registration.findById(saveRegistration._id)
      .populate("user")
      .populate("event");

    sendQR(
      registration.user.email,
      QRCODE,
      registration.user.name,
      registration.event.titel,
      saveRegistration._id,
    );

    res.status(201).json({
      success: true,
      message: "resgisteration completed",
    });
  } catch (error) {
    console.log("error in registration handler ", error);
    res.status(500).json({
      success: false,
      message: "error while registarion",
      error: error.message,
    });
  }
};

exports.viewMyEventsController = async (req, res) => {
  try {
    const userID = req.user.id;
    console.log("user id ", userID);
    if (!userID) {
      return res.status(401).json({
        success: false,
        message: "failed toshow events please logIn again",
      });
    }
    const showMyEvents = await Registration.find({ user: userID }).populate(
      "event",
    );

    if (!showMyEvents) {
      return res.status(400).json({
        success: false,
        message: "You have not registered for any event",
      });
    }

    res.status(200).json({
      success: true,
      showMyEvents,
    });
  } catch (error) {
    console.log("error in view my events handler ", error.message);
    res.status(500).json({
      success: false,
      message: "error in fetching data",
    });
  }
};

exports.searchEvent = async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({
        success: false,
        message: "invalid query",
      });
    }
    const events = await Event.find({
      $or: [
        { titel: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
        { createdBy: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
      eventDate: {
        $gte: Date.now(),
      },
    });
    if (!events) {
      return res.status(400).json({
        success: false,
        message: "No event found",
      });
    }
    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    console.log("error in search controller ", error.message);
    res.status(500).json({
      success: false,
      message: "error in fetching event",
      error: error.message,
    });
  }
};

exports.volunteerJoinController = async (req, res) => {
  try {
    const { join, phoneNumber } = req.body;
    const id = req.params.token;
    const event = req.params.event;
    const userId = req.user.id;

    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "please fill all the fields",
      });
    }

    if (join === true) {
      const findEvent = await volunteerInvites.findOne({ event, token: id });
      if (!findEvent) {
        return res.status(403).json({
          success: false,
          message: "the link is expired",
        });
      }

      const user = await volunteer.findOne({
        event: findEvent.event,
        volunteers: userId,
      });

      if (user) {
        return res.status(401).json({
          success: false,
          message: "you are already volunteer for this event",
        });
      }

      if (findEvent.token === id) {
        console.log("id = ", id, "token = ", findEvent.token);
        console.log("joinedcount = ", findEvent.joinedCount);
        console.log("maxcount = ", findEvent.maxVolunteers);
        if (findEvent.joinedCount >= findEvent.maxVolunteers) {
          return res.status(400).json({
            success: false,
            message: "The event is full. You cannot join as a volunteer now.",
          });
        }

        await User.findByIdAndUpdate(userId, {
          additionalInfo: {
            phone: phoneNumber,
          },
        });

        const saveUser = await volunteer.findOneAndUpdate(
          { event: findEvent.event },
          {
            $addToSet: {
              volunteers: userId,
            },
          },
          {
            returnDocument: "after",
            upsert: true,
          },
        );

        const event = await volunteerInvites.findOneAndUpdate(
          { token: id },
          {
            $inc: {
              joinedCount: 1,
            },
          },
        );

        await Event.findByIdAndUpdate(findEvent.event, {
          volunteers: true,
        });

        return res.status(200).json({
          success: true,
          message: "you are volunteer for this event",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "join request denied by the user",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong while joining as volunteer",
      error: error.message,
    });
  }
};

exports.verifyVolunteerController = async (req, res) => {
  try {
    const { id } = req.user;
    const isVolunteer = await volunteer
      .find({ volunteers: id })
      .populate("event");
    if (!isVolunteer || isVolunteer.length <= 0) {
      return res.status(400).json({
        success: false,
        message: "user is not volunteer",
      });
    }
    res.status(200).json({
      success: true,
      isVolunteer,
    });
  } catch (error) {
    console.log(
      "error whil verifying wheather a user is volunteer or not ",
      error.message,
    );
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

exports.saveAdditionalDetails = async (req, res) => {
  try {
    const { id } = req.user;
    const { address, bio, phone } = req.body;
    if (!address || !bio || !phone) {
      return res.status(400).json({
        success: false,
        message: "please fill all the fields",
      });
    }
    const user = await User.findByIdAndUpdate(
      id,
      {
        additionalInfo: {
          address,
          bio,
          phone,
        },
      },
      { returnDocument: "after" },
    );
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not exist",
      });
    }
    res.status(200).json({
      success: true,
      user,
      message: "data is saved successfully",
    });
  } catch (error) {
    console.log("error in additional info controllelr : ", error.message);
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { id } = req.user;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "please enter current password and new password",
      });
    }
    if (currentPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: "enter different password",
      });
    }
    const user = await User.findById(id);

    const compare = await bcrypt.compare(currentPassword, user.password);
    if (compare) {
      const hashPassword = await bcrypt.hash(newPassword, 10);
      const savePassword = await User.findByIdAndUpdate(id, {
        password: hashPassword,
      });
      return res.status(200).json({
        success: true,
        message: "password updated",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "incorrect password",
      });
    }
  } catch (error) {
    console.log("error in  change password handler : ", error.message);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.changeDp = async (req, res) => {
  const { id } = req.user;
  try {
    const dp = req.files.dp;
    if (!dp) {
      return res.status(400).json({
        success: false,
        message: "please select an dp",
      });
    }
    const photo = await cloudinary.uploader.upload(dp.tempFilePath, {
      folder: "user_Profile",
      resource_type: "auto",
    });

    console.log(photo);
    const user = await User.findByIdAndUpdate(id, {
      profile: {
        url: photo.secure_url,
        publicID: photo.public_id,
      },
    });

    await cloudinary.uploader.destroy(user.profile.publicID);

    res.status(200).json({
      success: false,
      message: "dp updated successully",
      user,
    });
  } catch (error) {
    console.log("error while updateing profil picture : ", error.message);
    res.status(500).json({
      success: false,
      message: "not able to updated profile picture",
      error: error.message,
    });
  }
};

exports.getLatestEventController = async (req, res) => {
  try {
    const events = await Event.find({
      eventDate: {
        $gte: new Date(),
      },
    })
      .sort({ eventDate: 1 })
      .limit(3);
    if (!events) {
      return res.status(400).json({
        success: false,
        message: "not able to fetch events",
      });
    }
    res.status(200).json({
      success: true,
      message: "events fetched successfully",
      events,
    });
  } catch (error) {
    console.log("error while fetching latest events : ", error.message);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.upcomingEventController = async (req, res) => {
  try {
    const events = await Event.find({
      eventDate: {
        $gte: new Date(),
      },
    });
    if (!events) {
      return res.status(400).json({
        success: false,
        message: "not able to fetch events",
      });
    }
    res.status(200).json({
      success: true,
      message: "events fetched successfully",
      events,
    });
  } catch (error) {
    console.log("error while fetching latest events : ", error.message);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.getEventDetailsController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id is not present",
      });
    }
    const event = await Event.findById(id).populate("admin");
    if (!event) {
      return res.status(403).json({
        success: false,
        message: "their is no event with this id",
      });
    }
    res.status(200).json({
      success: true,
      message: "event found",
      event,
    });
  } catch (error) {
    console.log(
      "error in event detsils handler of user event  : ",
      error.message,
    );
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.allVolunteerEventsController = async (req, res) => {
  try {
    const userId = req.user.id;
    const userVoulnteersEvents = await volunteer
      .find({ volunteers: userId })
      .countDocuments();
    if (!userVoulnteersEvents) {
      return res.status(400).json({
        success: false,
        message: "user is not volunteer for any event",
      });
    }
    res.status(200).json({
      success: true,
      userVoulnteersEvents,
    });
  } catch (error) {
    console.log("error in users  all volunteer events  : ", error.message);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.scanQrController = async (req, res) => {
  try {
    const registrationId = req.params.id;

    // 1. Check registration ID
    if (!registrationId) {
      return res.status(400).json({
        success: false,
        message: "Registration ID is required",
      });
    }

    // 2. Get registration + event
    const userRegistration =
      await Registration.findById(registrationId).populate("event");

    if (!userRegistration) {
      return res.status(404).json({
        success: false,
        message: "This is not a valid registration ID",
      });
    }

    if (!userRegistration.event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const event = userRegistration.event;

    console.log("Registration ID:", registrationId);
    console.log("Event ID:", event._id);

    // 3. Get logged-in user
    const { id } = req.user;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 4. Check volunteer for THIS event
    if (user.role === "user") {
      const isUserVolunteer = await volunteer.findOne({
        event: event._id,
        volunteers: id,
      });

      console.log("Volunteer:", isUserVolunteer);

      if (!isUserVolunteer) {
        return res.status(403).json({
          success: false,
          message: "You are not a volunteer for this event",
        });
      }
    }

    // 5. Check event timing
    const eventStartTime = new Date(event.eventDate).getTime();

    const eventEndTime = eventStartTime + event.duration * 60 * 60 * 1000;

    const currentTime = Date.now();

    const isLive = currentTime >= eventStartTime && currentTime <= eventEndTime;

    if (!isLive) {
      return res.status(400).json({
        success: false,
        message:
          "Event is not currently live. QR scanning is available only during the event.",
      });
    }

    // 6. Check if QR already used
    if (userRegistration.status === "attended") {
      return res.status(400).json({
        success: false,
        message: "QR code is already used",
      });
    }

    // 7. Check registration status
    if (userRegistration.status !== "registered") {
      return res.status(400).json({
        success: false,
        message: "This registration cannot be checked in",
      });
    }

    // 8. Mark attendee as attended
    await Registration.findByIdAndUpdate(registrationId, {
      status: "attended",
    });

    const checkedInData = await TotalCheckedIn.findOneAndUpdate(
      {
        volunteer: id,
      },

      {
        $set: {
          volunteer: id,
          event: userRegistration.event,
        },

        $push: {
          users: userRegistration.user,
        },
      },

      {
        upsert: true,
        new: true,
      },
    );

    console.log("checked In object ", checkedInData);
    return res.status(200).json({
      success: true,
      message: "User is verified successfully",
    });
  } catch (error) {
    console.log("Scan QR error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while scanning",
      error: error.message,
    });
  }
};
