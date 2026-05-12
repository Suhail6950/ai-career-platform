const axios = require("axios");

const getGithubData = async (req, res) => {

  try {

    const username = req.params.username;

    const response = await axios.get(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "AI-Career-Platform",
        },
      }
    );

    res.json({
      success: true,
      profile: response.data,
    });

  } catch (error) {

    console.log(
      "GitHub Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      message: "GitHub fetch failed",
    });
  }
};

module.exports = {
  getGithubData,
};