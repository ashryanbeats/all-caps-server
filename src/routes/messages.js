import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const { nylas, nylasConfig } = req;

  try {
    const grantId = process.env.NYLAS_GRANT_ID;

    console.log("Fetching emails for grant ID:", grantId);

    const messages = await nylas.messages.list({
      identifier: grantId,
      queryParams: {
        limit: 5,
      },
    });

    res.json(messages);
  } catch (error) {
    console.error("Error fetching emails:", error);
  }
});

const updateMessageFolder = async (grantId, messageId, updatedMetadata) => {
  const { nylas, nylasConfig } = req;

  try {
    const updatedMessage = await nylas.messages.update({
      identifier: grantId,
      messageId,
      requestBody: updatedMetadata,
    });

    console.log("Message updated:", updatedMessage);

    return updatedMessage;
  } catch (error) {
    console.error("Error updating message folder:", error);
  }
};

router.put("/:messageId/metadata", (req, res) => {
  const { nylas, nylasConfig } = req;

  const { messageId } = req.params;
  const { grantId, updatedMetadata } = req.body;

  const updatedMessage = updateMessageFolder(
    grantId,
    messageId,
    updatedMetadata
  );

  res.json(updatedMessage);
});

export default router;
