const express = require("express");

const axios = require("axios");

const router = express.Router();

router.get("/:username",
async (req, res) => {

  try {

    const { username } = req.params;

    const userResponse =
      await axios.get(
        `https://api.github.com/users/${username}`
      );

    const reposResponse =
      await axios.get(
        `https://api.github.com/users/${username}/repos`
      );

    const totalStars =
      reposResponse.data.reduce(
        (acc, repo) =>
          acc + repo.stargazers_count,
        0
      );

    res.status(200).json({

      profile: {

        name: userResponse.data.name,

        bio: userResponse.data.bio,

        avatar:
          userResponse.data.avatar_url,

        followers:
          userResponse.data.followers,

        following:
          userResponse.data.following,

        publicRepos:
          userResponse.data.public_repos,

        totalStars,

      },

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: "GitHub Fetch Failed",

    });

  }

});

module.exports = router;