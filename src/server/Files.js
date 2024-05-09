const fs = require('fs');
const path = require('path');

const extensionsMIME = {
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.txt': 'text/plain'
};

class Files {
    targetPath = '';
    constructor(target) {
        this.targetPath = target;
    }
    load(url) {
        url = path.join(__dirname, this.targetPath, url);
        console.log(url);
        const file = { code: 200, type: 'text/html' };

        try {
            const type = this.supported(url);
            if (type) file.type = type;
            else if (type === null) url += '.html';

            file.content = fs.readFileSync(url);
        } catch (error) {
            file.code = 500;
            file.type = 'text/plain';
            file.content = 'Internal Server Error';
        }
        return file;
    }
    supported(url) {
        const extension = url.substring(url.lastIndexOf('.'));
        if (extensionsMIME.hasOwnProperty(extension)) {
            return extensionsMIME[extension];
        } else if (!url.endsWith('.html')) {
            return null;
        }
        return false;
    }
};

module.exports = Files;