const ErrorHandler = async (error, req, res, next) => {
  switch (error.name) {
    case "SequelizeValidationError":
      res.status(400).json({ message: error.errors.map((el) => el.message) });
      break;
    case "SequelizeUniqueConstraintError":
      res.status(400).json({ message: error.errors.map((el) => el.message) });
      break;
    case "INVALID_BODY":
      res.status(400).json({ message: "Required email/ password" });
      break;
    case "INVALID_USER_OR_PASSWORD":
      res.status(401).json({ message: "Invalid Username/ Password" });
      break;
    case "INVALID_ACCESS_TOKEN":
      res.status(401).json({ message: "User not logged in yet" });
      break;
    case "USER_NOT_FOUND":
      res.status(401).json({ message: "User not found" });
      break;
    case "JsonWebTokenError":
      res.status(401).json({ message: "Invalid token" });
      break;
    case "INVALID_ACCESS":
      res.status(401).json({ message: "Customer access only" });
      break;
    case "FORBIDDEN_ACCESS":
      res.status(403).json({ message: "User cannot access this action" });
      break;
    case "FORBIDDEN":
      res.status(403).json({ message: "Food status must be active" });
      break;
    case "FOOD_DETAIL_NOT_FOUND":
      res.status(404).json({ message: "Food not found" });
      break;
    case "EDITED_FOOD_NOT_FOUND":
      res.status(404).json({ message: "Food not found" });
      break;
    case "DELETED_FOOD_NOT_FOUND":
      res.status(404).json({ message: "Food not found" });
      break;
    case "UPDATED_FOOD_NOT_FOUND":
      res.status(404).json({ message: "Food not found" });
      break;
    case "CATEGORY_NOT_FOUND":
      res.status(404).json({ message: "Category not found" });
      break;
    case "DELETED_CATEGORY_NOT_FOUND":
      res.status(404).json({ message: "Category not found" });
      break;
    case "DUPLICATE":
      res.status(409).json({ message: "Menu is already in your favorite" });
      break;
    default:
      res.status(500).json({ message: "Internal Server Error" });
      break;
  }
};

module.exports = ErrorHandler;
