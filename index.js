require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/signup", async (req, res) => {
  const { username, secret, email, first_name, last_name } = req.body;

  try {
    const r = await axios.post(
      "https://api.chatengine.io/users/",
      { username, secret, email, first_name, last_name },
      { headers: { "Private-Key": process.env.CHAT_ENGINE_PRIVATE_KEY } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

app.post("/login", async (req, res) => {
  const { email, secret } = req.body;
  //print them
  console.log("email ", email);
  console.log("secret ", secret);

  const headers = {
    "PRIVATE-KEY": "b48f0816-7079-4281-888f-f55fbb691e0b",
  };
  const body = { username: email, secret: secret };

  try {
    axios
      .put("https://api.chatengine.io/users/", body, { headers })
      .then((response) => {
        console.log("response data is ", response.data);
        return res.status(201).json(response.data);
      });
  } catch (e) {
    console.log("response data is ", e.response.data);
    return res.status(e.response.status).json(e.response.data);
  }
});

// Docs at rest.chatengine.io
// vvv On port 3001!
app.listen(3001, () => {
  console.log("listening on port 3001");
});
