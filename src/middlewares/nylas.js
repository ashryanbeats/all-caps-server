import Nylas from "nylas";

const nylasMiddleware = (req, res, next) => {
  const nylasConfig = {
    clientId: process.env.NYLAS_CLIENT_ID,
    callbackUri: process.env.NYLAS_CALLBACK_URI,
    apiKey: process.env.NYLAS_API_KEY,
    apiUri: process.env.NYLAS_API_URI,
  };

  const nylas = new Nylas({
    apiKey: nylasConfig.apiKey,
    apiUri: nylasConfig.apiUri,
  });

  req.nylas = nylas;
  req.nylasConfig = nylasConfig;

  next();
};

export default nylasMiddleware;
