// Simple in-memory rate limiter
const requestCounts = new Map();
const WINDOW_SIZE = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 3; // Max 3 requests per window

export const rateLimitForgotPassword = (req, res, next) => {
  const clientId = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  // Clean up old entries
  for (const [key, data] of requestCounts.entries()) {
    if (now - data.firstRequest > WINDOW_SIZE) {
      requestCounts.delete(key);
    }
  }
  
  const clientData = requestCounts.get(clientId);
  
  if (!clientData) {
    // First request from this client
    requestCounts.set(clientId, {
      count: 1,
      firstRequest: now
    });
    return next();
  }
  
  if (now - clientData.firstRequest > WINDOW_SIZE) {
    // Window has expired, reset
    requestCounts.set(clientId, {
      count: 1,
      firstRequest: now
    });
    return next();
  }
  
  if (clientData.count >= MAX_REQUESTS) {
    const timeLeft = WINDOW_SIZE - (now - clientData.firstRequest);
    const minutesLeft = Math.ceil(timeLeft / (60 * 1000));
    
    return res.status(429).json({
      success: false,
      message: "RATE_LIMIT_EXCEEDED",
      retryAfter: minutesLeft
    });
  }
  
  // Increment count
  clientData.count++;
  next();
};
