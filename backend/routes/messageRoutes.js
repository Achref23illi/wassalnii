// backend/routes/messageRoutes.js
const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const { db, FieldValue } = require("../firebase");

// POST /api/messages: Sends a message to another user
router.post("/messages", authenticate, async (req, res) => {
  const { receiverId, content } = req.body;
  const senderId = req.user.id;

  try {
    const message = {
      senderId,
      receiverId,
      content,
      timestamp: FieldValue.serverTimestamp(),
    };

    console.log("Adding message:", message);

    await db.collection("messages").add(message);

    res.status(201).json({ msg: "Message sent successfully" });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
});

// GET /api/messages: Retrieves messages between the user and others
router.get("/messages", authenticate, async (req, res) => {
  const userId = req.user.id;
  const { otherUserId } = req.query;

  try {
    const messages = [];
    const snapshot = await db
      .collection("messages")
      .where("senderId", "in", [userId, otherUserId])
      .where("receiverId", "in", [userId, otherUserId])
      .orderBy("timestamp", "asc")
      .get();

    snapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });

    res.json(messages);
  } catch (err) {
    console.error("Error retrieving messages:", err);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
});

module.exports = router;
