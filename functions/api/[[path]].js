//https://github.com/cloudflare/images.pages.dev
export async function onRequest(context) {
    // Contents of context object
    try {
        const {
            request, // same as existing Worker API
            env, // same as existing Worker API
            params, // if filename includes [id] or [[path]]
            waitUntil, // same as ctx.waitUntil in existing Worker API
            next, // used for middleware or to fetch assets
            data, // arbitrary space for passing data between middlewares
        } = context;
        const url = new URL(request.url);
        url.hostname = "app.telesathi.com";
        return await fetch(url.toString(), request);
    } catch (e) {
        return new Response(`Fail ${e.message}`);
    }
}
