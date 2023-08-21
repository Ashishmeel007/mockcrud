const express = require("express");
const { Doctor } = require("../models/doctor")

const doctorRouter = express.Router();

doctorRouter.post("/appointments", async (req, res) => {
    try {
        const { name, image, specialization, experience, location, slots, fee } = req.body;
        const newDoctor = new Doctor({
            name,
            image,
            specialization,
            experience,
            location,
            slots,
            fee
        });
        await newDoctor.save();
        res.status(201).json({ message: "Appointment created successfully" });
    } catch (error) {
        res.status(500).json({ error: "An error occurred" });
    }
});

doctorRouter.get("/", async (req, res) => {
    const { search, specialization, sort } = req.query; 

    try {
        let query = {};
        if (search) {
            query.name = { $regex: new RegExp(search, "i") };
        }
        if (specialization) {
            query.specialization = specialization;
        }

        let sortOptions = {};
        if (sort === "date") {
            sortOptions.date = 1; 
        }

        const doctors = await Doctor.find(query).sort(sortOptions); 
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while getting data" });
    }
});


doctorRouter.patch("/update/:postID", async (req, res) => {
    const { userID } = req.body;
    const { postID } = req.params;

    try {
        const post = await Doctor.findOne({ _id: postID });
        const userIDinPostDoc = post.userID;
        if (userID === userIDinPostDoc) {
            req.body.date = new Date();
            await Doctor.findByIdAndUpdate(postID, req.body,{ new: true }); 
            res.json({ msg: `${post.name}'s data has been changed` });
        } else {
            res.json({ msg: "Something went wrong" });
        }
    } catch (err) {
        res.json({ error: err.message });
    }
});

doctorRouter.delete("/delete/:postID", async (req, res) => {
    const { userID } = req.body;
    const { postID } = req.params;

    try {
        const post = await Doctor.findOne({ _id: postID });
        const userIDinPostDoc = post.userID;
        if (userID === userIDinPostDoc) {
            await Doctor.findByIdAndDelete(postID);
            res.json({ msg: `${post.name}'s data has been deleted` });
        } else {
            res.json({ msg: "Something went wrong" });
        }
    } catch (err) {
        res.json({ error: err.message });
    }
});

module.exports = {
    doctorRouter
};
