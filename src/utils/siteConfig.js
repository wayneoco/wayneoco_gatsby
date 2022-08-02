const config = require(`../../.ghost.json`).production;
module.exports = {
    siteUrl:
        process.env.NODE_ENV === `production`
            ? process.env.SITE_URL || config.siteUrl || `http://localhost:8000`
            : `https://wayneo.co`, // Site domain. Do not include a trailing slash!

    postsPerPage: 5, // Number of posts shown on paginated pages (changes this requires sometimes to delete the cache)

    siteTitleMeta: `Wayne Olson`, // This allows an alternative site title for meta data for pages.
    siteDescriptionMeta: `The personal website of Wayne Olson, software engineer and dad of two.`, // This allows an alternative site description for meta data for pages.

    shareImageWidth: 1000, // Change to the width of your default share image
    shareImageHeight: 523, // Change to the height of your default share image

    shortTitle: `wayneoco`, // Used for App manifest e.g. Mobile Home Screen
    siteIcon: `favicon.png`, // Logo in /static dir used for SEO, RSS, and App manifest
    backgroundColor: `#e9e9e9`, // Used for Offline Manifest
    themeColor: `#15171A`, // Used for Offline Manifest
};
