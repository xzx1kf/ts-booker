var config = {
  expressPort: 3000,
  client: {
    mongodb: {
      defaultDatabase: "ts-booker",
      defaultCollection: "bookings",
      defaultUri: "mongodb://localhost:27017"
    }
  }
};

module.exports = config;
