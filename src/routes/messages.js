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

const updateMessageMetadata = async (
  nylas,
  grantId,
  messageId,
  newMetadata
) => {
  try {
    const updatedMessage = await nylas.messages.update({
      identifier: grantId,
      messageId,
      requestBody: newMetadata,
    });

    console.log("Message updated:", updatedMessage);

    return updatedMessage;
  } catch (error) {
    console.error("Error updating message folder:", error);
  }
};

router.put("/:messageId/metadata", async (req, res) => {
  const { nylas, nylasConfig } = req;
  const { messageId } = req.params;
  const { newMetadata } = req.body;

  if (!newMetadata) {
    return res
      .status(400)
      .json({ message: "No metadata found in request body." });
  }

  const grantId = process.env.NYLAS_GRANT_ID;

  const updatedMessage = await updateMessageMetadata(
    nylas,
    grantId,
    messageId,
    newMetadata
  );

  res.json(updatedMessage);
});

export default router;
