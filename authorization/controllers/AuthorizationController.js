require('dotenv').config();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || 3600; // 1 hour

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const UserModel = require("../../common/models/User");
const { roles } = require("../../config");

const generateAccessToken = (username, userId) => {
  return jwt.sign(
    {
      userId,
      username,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRATION,
    }
  );
};

const encryptPassword = (password) => {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
};

module.exports = {
  register: (req, res) => {
    const payload = req.body;

    console.log("Received registration request with payload:", payload);

    let encryptedPassword = encryptPassword(payload.password);
    let role = payload.role || roles.USER; // Default role to USER if not provided

    console.log("Encrypted Password:", encryptedPassword);

    UserModel.createUser(
      Object.assign(payload, { password: encryptedPassword, role })
    )
      .then((user) => {
        console.log("User created:", user);

        const accessToken = generateAccessToken(payload.username, user.id);
        console.log("Generated access token:", accessToken);

        return res.status(200).json({
          status: true,
          data: {
            user: user.toJSON(),
            token: accessToken,
          },
        });
      })
      .catch((err) => {
        console.error("Error occurred during registration:", err);
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },
  login: (req, res) => {
    const { username, password } = req.body;

    UserModel.findUser({ username })
      .then((user) => {
        if (!user) {
          return res.status(400).json({
            status: false,
            error: {
              message: `Could not find any user with username: \`${username}\`.`,
            },
          });
        }

        const encryptedPassword = encryptPassword(password);

        if (user.password !== encryptedPassword) {
          return res.status(400).json({
            status: false,
            error: {
              message: `Provided username and password did not match.`,
            },
          });
        }

        const accessToken = generateAccessToken(user.username, user.id);

        return res.status(200).json({
          status: true,
          data: {
            user: user.toJSON(),
            token: accessToken,
          },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },
};
