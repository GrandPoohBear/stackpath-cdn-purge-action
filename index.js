const core = require("@actions/core");
const github = require("@actions/github");
const fetch = require("node-fetch");

const OAUTH_ENDPOINT = "https://gateway.stackpath.com/identity/v1/oauth2/token";

(async function () {
  try {
    const clientId = core.getInput("clientId");
    const clientSecret = core.getInput("clientSecret");
    const stackId = core.getInput("stackId");
    const url = core.getInput("url");

    const response = await fetch(OAUTH_ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
      }),
    });
    const json = await response.json();

    const accessToken = json.access_token;
    const purgeResponse = await fetch(
      `https://gateway.stackpath.com/cdn/v1/stacks/${stackId}/purge`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          items: [
            {
              url: url,
              recursive: true,
              invalidateOnly: true,
            },
          ],
        }),
      }
    );
    const purgeJson = await purgeResponse.json();

    console.log("Purge response", purgeJson);
    console.log(`Purge ID: ${purgeJson.id}`);
    core.setOutput("Purge ID", purgeJson.id);
  } catch (error) {
    core.setFailed(error.message);
  }
})();
