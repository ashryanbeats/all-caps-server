import express from "express";
import { mockEmails } from "../data/emails.js";

const app = express();

app.get("/messages", (req, res) => {
  res.json(mockEmails);
});

const updateMessageFolder = async (grantId, messageId, updatedMetadata) => {
  try {
    const updatedMessage = await nylas.messages.update({
      grantId,
      messageId,
      requestBody: updatedMetadata,
    });

    console.log("Message updated:", updatedMessage);

    return updatedMessage;
  } catch (error) {
    console.error("Error updating message folder:", error);
  }
};

app.put("/messages/:messageId/metadata", (req, res) => {
  const { messageId } = req.params;
  const { grantId, updatedMetadata } = req.body;

  const updatedMessage = updateMessageFolder(
    grantId,
    messageId,
    updatedMetadata
  );

  res.json(updatedMessage);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
