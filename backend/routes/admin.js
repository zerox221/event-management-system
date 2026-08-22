const express = require('express');
const { authMiddleware, isOrganizer } = require('../middlewares/auth');
const { createEventController,dashboardSummaryController,SearchUser,viewAllRegistration,allActiveStreams,topPerformingVolunteers,checkedInUsersController,viewVolunteersController, getEventController, viewRegsiteredUser, deleteEventController, updateEventController, scanQrController, addVoluenters, deleteVoluentersController, ViewMyEventsController } = require('../controllers/admin.controller');
const adminRoutes = express.Router();

adminRoutes.get("/get/event/:id",authMiddleware,isOrganizer,getEventController);

adminRoutes.post("/create/event",authMiddleware,isOrganizer,createEventController);

adminRoutes.get("/get/my/events",authMiddleware,isOrganizer,ViewMyEventsController);

adminRoutes.get("/registered/users/:id",authMiddleware,isOrganizer,viewRegsiteredUser);

adminRoutes.put("/delete/event/:id",authMiddleware,isOrganizer,deleteEventController);

adminRoutes.put("/update/event/:id",authMiddleware,isOrganizer,updateEventController);

adminRoutes.post("/add/volunteer/:id",authMiddleware,isOrganizer,addVoluenters);

adminRoutes.put("/delete/volunteer/:id",authMiddleware,isOrganizer,deleteVoluentersController);

adminRoutes.get("/view/volunteer/:id",authMiddleware,isOrganizer,viewVolunteersController);

adminRoutes.get("/checked/in/users/:id",authMiddleware,isOrganizer,checkedInUsersController)



adminRoutes.get("/get/dashboard/summary",authMiddleware,isOrganizer,dashboardSummaryController);

adminRoutes.get("/get/top/volunteer",authMiddleware,isOrganizer,topPerformingVolunteers);


adminRoutes.get("/get/all/activity",authMiddleware,isOrganizer,allActiveStreams);

adminRoutes.get("/get/all/registered/User",authMiddleware,isOrganizer,viewAllRegistration);

adminRoutes.get("/search/user",authMiddleware,isOrganizer,SearchUser);





module.exports = adminRoutes;