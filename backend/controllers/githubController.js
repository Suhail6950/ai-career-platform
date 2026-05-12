const getGithubData = async (req, res) => {

  try {

    const username = req.params.username;

    res.json({
      success: true,
      profile: {
        login: username,
        name: "Linus Torvalds",
        public_repos: 8,
        followers: 250000,
        following: 0,
        bio: "Creator of Linux and Git",
        avatar_url:
          "https://avatars.githubusercontent.com/u/1024025?v=4",
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "GitHub fetch failed",
    });
  }
};

module.exports = {
  getGithubData,
};