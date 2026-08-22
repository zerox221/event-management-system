const express = require('express');
const { authMiddleware, isUser, isOrganizer } = require('../middlewares/auth');
const { getUserController,scanQrController,saveAdditionalDetails,allVolunteerEventsController,getEventDetailsController,upcomingEventController,getLatestEventController,changeDp,changePassword, viewAllEventsController,verifyVolunteerController, CheckVolunteerController, volunteerJoinController,  viewMyEventsController, registraionController, searchEvent } = require('../controllers/user.controller');
const { registerController } = require('../controllers/auth.controller');

const userRoutes = express.Router();



//route to fetch user details if it is admin
userRoutes.get("/get/me",authMiddleware,getUserController);

//routes toview all events
userRoutes.get("/view/all/Events",authMiddleware,isUser,viewAllEventsController);

//route to view all events in which user is registered
userRoutes.get("/view/my/Events",authMiddleware,isUser,viewMyEventsController);

//search event
userRoutes.get("/search",authMiddleware,isUser,searchEvent);

//route for registration
userRoutes.post("/registration/:id",authMiddleware,isUser,registraionController);

userRoutes.post('/join/:event/:token',authMiddleware,isUser,volunteerJoinController);

userRoutes.get('/is/user/volunteer',authMiddleware,isUser,verifyVolunteerController);

userRoutes.post('/additional/info',authMiddleware,saveAdditionalDetails);

userRoutes.post('/change/password',authMiddleware,changePassword);

userRoutes.put('/change/dp',authMiddleware,changeDp);

userRoutes.get('/get/latest/events',authMiddleware,isUser,getLatestEventController);

userRoutes.get('/upcoming/events',authMiddleware,isUser,upcomingEventController);

userRoutes.get('/get/details/:id',authMiddleware,isUser,getEventDetailsController);

userRoutes.get('/all/volunteers/events/count',authMiddleware,isUser,allVolunteerEventsController);

userRoutes.get("/scan/qr/:id",authMiddleware,isUser,scanQrController);

module.exports = userRoutes;
