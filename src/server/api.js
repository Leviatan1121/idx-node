const SERVER_TIME = JSON.stringify(Date.now());

const api = {
    endpoints: {
        time: () => SERVER_TIME
    },
    request: function (url) {
        url = url.replace('/api/', '');
        if (this.endpoints[url]) {
            return {
                ok: true,
                data: this.endpoints[url]()
            };
        }
        return {
            code: 500,
            type: 'text/plain',
            content: 'Internal Server Error'
        };
    }
};

module.exports = api;