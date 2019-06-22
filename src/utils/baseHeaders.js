const baseHeaders = token => {
    let headers = {
        'Content-Type': 'application/json'
    };

    if (token) {
        headers['x-auth-token'] = token;
    }

    return (config) => {
        return {
            headers,
            ...config
        }
    };
};

export default baseHeaders;