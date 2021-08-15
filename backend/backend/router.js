const helpers = require('./common/helpers');

module.exports = async (req, res, routes) => {
    if(req.method === 'OPTIONS') {
        return helpers.success(res);
    }
    // Find a matching route
    const route = routes.find((route) => {
        const methodMatch = route.method === req.method;
        let pathMatch = false;

        if (typeof route.path === 'object') {
            // Path is a RegEx, we use RegEx matching
            pathMatch = req.url.match(route.path);
        }
        else {
            // Path is a string, we simply match with URL
            pathMatch = route.path === req.url;
        }

        return pathMatch && methodMatch;
    });

    // Extract request body
    if (route) {
        let body = null;
        if (req.method === 'POST' || req.method === 'PUT') {
            body = await getPostData(req);
        }
        
        return route.handler(req, res, body);
    } else {
        return helpers.error(res, 'Endpoint not found', 404);
    }
};

/**
 * Extract posted data from request body
 * @param req
 * @returns {Promise<any>}
 */
function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString(); // convert Buffer to string
            });

            req.on('end', () => {
                //resolve(parse(body));
                resolve(body);
            });
        }
        catch (e) {
            reject(e);
        }
    });
}