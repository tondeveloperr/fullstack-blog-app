const allowedOrigins = ["http://localhost:3000"];

const corsOptions = {
  origin: function (requestOrigin, callback) {
    if (allowedOrigins.indexOf(requestOrigin) !== -1 || !requestOrigin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["PATCH", "GET", "POST", "DELETE", "OPTIONS"],
  // allowedHeaders: ["Content-Type", "Authorization"],
};

export default corsOptions;
