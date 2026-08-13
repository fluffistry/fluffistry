export default function handler(req, res) {
    const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
    const redirectUri = `https://${req.headers.host}/api/callback`;

    const authUrl =
        `https://github.com/login/oauth/authorize` +
        `?client_id=${clientId}` +
        `&scope=repo,user` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}`;

    res.writeHead(302, { Location: authUrl });
    res.end();
}
