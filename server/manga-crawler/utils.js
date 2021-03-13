

function all(items, fn) {

    const promises = items.map(item => fn(item));
    return Promise.all(promises);
}

function series(items, fn) {
    let result = [];
    return items.reduce((acc, item) => {
        acc = acc.then(() => {
            return fn(item).then(res => result.push(res));
        });
        return acc;
    }, Promise.resolve())
        .then(() => result);
}

function splitToChunks(items, chunkSize = 15) {
    const result = [];
    for (let i = 0; i < items.length; i += chunkSize) {
        result.push(items.slice(i, i + chunkSize));
    }
    return result;
}

function chunks(items, fn, chunkSize = 15) {
    let result = [];
    const chunks = splitToChunks(items, chunkSize);
    return series(chunks, chunk => {
        return all(chunk, fn)
            .then(res => result = result.concat(res))
    })
        .then(() => result);
}

module.exports = {
    all,
    series,
    chunks
};