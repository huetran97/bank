import * as crypto from 'crypto';

export const sha1 = (data: string) => {
    return crypto.createHash('sha1').update(data).digest('hex');
};

export const getTimeStamp = () => {
    return Math.round(Date.now() / 1000);
};

export const randomString      = (len) => {
    const charSet    = 'ABCDEF012GHIJKL345MNOPQR678STUVWXYZ9';
    let randomString = '';
    for (let i = 0; i < len; i++) {
        let randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
};
export const sortAnObjectByKey = (unordered) => {
    return new Promise((resolve, reject) => {
        try {
            const ordered = {};
            Object.keys(unordered).sort().forEach(function (key) {
                ordered[key] = unordered[key];

                return resolve(ordered);
            });
        } catch (err) {
            return reject(err);
        }
    });


};
export const joinOb            = (sorted) => {
    return new Promise((resolve, reject) => {
        try {
            let sig_data = [];
            Object.keys(sorted).map(key => {
                sig_data.push(key + '=' + sorted[key]);
            });
            return resolve(sig_data.join(''));
        } catch (err) {
            return reject(err);
        }
    });
};
