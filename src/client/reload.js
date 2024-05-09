var CLIENT_TIME = null;
setInterval(() => {
    fetch('api/time')
        .then(res => res.json())
        .then(SERVER_TIME => {
            if (!CLIENT_TIME) {
                CLIENT_TIME = SERVER_TIME;
            } else if (CLIENT_TIME != SERVER_TIME) {
                location.reload();
            }
        });
}, 1500);