import { Router } from "express";

const router = Router();

router.get("/authorize", (req, res) => {
  const { nylas, nylasConfig } = req;

  const authUrl = nylas.auth.urlForOAuth2({
    clientId: nylasConfig.clientId,
    redirectUri: nylasConfig.callbackUri,
  });

  res.redirect(authUrl);
});

router.get("/callback", async (req, res) => {
  const { nylas, nylasConfig } = req;
  console.log("Received callback from Nylas");
  const code = req.query.code;

  if (!code) {
    res.status(400).send("No authorization code returned from Nylas");
    return;
  }

  const codeExchangePayload = {
    clientSecret: nylasConfig.apiKey,
    clientId: nylasConfig.clientId,
    redirectUri: nylasConfig.callbackUri,
    code,
  };

  try {
    const response = await nylas.auth.exchangeCodeForToken(codeExchangePayload);
    const { grantId } = response;

    // NB: This stores in RAM
    // In a real app you would store this in a database, associated with a user
    process.env.NYLAS_GRANT_ID = grantId;

    console.log(
      "OAuth2 flow completed successfully for grant ID:",
      process.env.NYLAS_GRANT_ID
    );

    res.json({
      message: "OAuth2 flow completed successfully for grant ID: " + grantId,
    });
  } catch (error) {
    res.status(500).send("Failed to exchange authorization code for token");
  }
});

export default router;
