module.exports = {
    immutableHandler: {
        set(o, p, v) {
            throw new Error('Tried to change value of \'' + p + '\' property of an object that is immutable.');
        }
    },
    shuffleHandler(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }
};