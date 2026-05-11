const express = require("express");

const router = express.Router();

router.get("/:username", async (req, res) => {
  try {

    const { username } = req.params;

    const response = await fetch(
      `https://api.github.com/users/${username}`
    );

    const data = await response.json();

    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos`
    );

    const repos = await reposResponse.json();

    let totalStars = 0;

    repos.forEach((repo) => {
      totalStars += repo.stargazers_count;
    });

    res.json({
      success: true,

      profile: {
        name: data.name,
        avatar: data.avatar_url,
        bio: data.bio,
        followers: data.followers,
        following: data.following,
        publicRepos: data.public_repos,
        githubUrl: data.html_url,
        totalStars,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });

  }
});

module.exports = router;