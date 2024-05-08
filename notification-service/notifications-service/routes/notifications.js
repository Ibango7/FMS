import express from "express";
import { receiveMessageFromQueue } from "../receiver.js";
import admin from "firebase-admin";

async function processReceivedMessage() {
  try {
    const queueName = "notifications";
    const receivedMsg = await receiveMessageFromQueue(queueName);
    console.log("Received message:", receivedMsg);

    handleNotification(receivedMsg);
  } catch (error) {
    console.error("Error while receiving message", error);
  }
}

processReceivedMessage();
// Set up an interval to periodically check for new messages in the queue
const intervalTime = 10000; // 5 seconds (adjust this as needed)
setInterval(processReceivedMessage, intervalTime);

export function handleNotification(message) {
  console.log("Listening to incoming messages...");
  // Extract required data from the message
  const { responses, userId, data } = message;

  // Store the message in the Notification collection
  const db = admin.firestore();
  const notificationRef = db.collection("Notifications").doc(data.senderId);
  // Store the message in the MyNotifications subcollection
  notificationRef
    .collection("MyNotifications")
    .add(data)
    .then(() => {
      console.log("Notification sent successfully!");
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

const router = express.Router();
export default router;