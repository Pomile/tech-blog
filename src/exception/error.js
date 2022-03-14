module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    // Handling Joi Validation Error
    if (err.status === 400) {
      return res.status(400).json({
        success: false,
        errors: err.info,
      });
    }
    // handling jwt error
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  
    // expiredJWT
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }
  
    if(err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        success: false,
        message: "Resource already exists",
      });
    }
   
    console.log(err);
    let error = { ...err };
    error.message = err.message;
    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error.",
      error: error.info
    });
  };
  