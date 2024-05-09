const targets = {
    'index.html': ['/', 'index', 'app']
};

const routes = {};
for (const key in targets) {
    if (Object.hasOwnProperty.call(targets, key)) {
        const paths = targets[key];
        for (const path in paths) {
            if (Object.hasOwnProperty.call(paths, path)) {
                let element = paths[path];
                if (element != '/') element = '/' + element;
                routes[element] = `/${key}`;
            }
        }
    }
}

module.exports = routes;