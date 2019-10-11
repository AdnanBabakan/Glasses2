function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

module.exports = {
    //Objects
    _Solid: class {
        constructor(d) {
            this.data = d;
            return new Proxy(this, this);
        }
        get(t, p) {
            switch (p) {
                default:
                    return t.data[p];
                    break;
                case 'all':
                    return this.data;
                    break;
                case 'length':
                    return Object.keys(this.data).length;
                    break;
            }
        }
        set() {
            throw new Error('_Solid object cannot be changed or assigned new value to');
        }
    },
    _Paste: class {
        constructor(d) {
            this.data = d;
            return new Proxy(this, this);
        }
        get(t, p) {
            switch (p) {
                default:
                    return t.data[p];
                    break;
                case 'all':
                    return this.data;
                    break;
                case 'length':
                    return Object.keys(this.data).length;
                    break;
            }
        }
        set(t, p, v) {
            if (t.data[p] == null) {
                t.data[p] = v;
            } else {
                throw new Error('_Paste property value cannot be changed');
            }
        }
    },
    _Plasma: class {
        constructor(d) {
            this.data = d;
            return new Proxy(this, this);
        }
        get(t, p) {
            switch (p) {
                default:
                    return t.data[p];
                    break;
                case 'all':
                    return this.data;
                    break;
                case 'length':
                    return Object.keys(this.data).length;
                    break;
            }
        }
        set(t, p, v) {
            if (t.data[p] != null) {
                t.data[p] = v;
            } else {
                throw new Error('_Plasma cannot take a new property');
            }
        }
    },
    _Gas: class {
        constructor(d) {
            this.data = d;
            return new Proxy(this, this);
        }
        get(t, p) {
            switch (p) {
                default:
                    return t.data[p];
                    break;
                case 'all':
                    return this.data;
                    break;
                case 'length':
                    return Object.keys(this.data).length;
                    break;
            }
        }
        set(t, p, v) {
            t.data[p] = v;
        }
    },
    //Arrays
    _Liquid: class {
        constructor(d) {
            for (let i = d.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [d[i], d[j]] = [d[j], d[i]];
            }
            this.data = d;
            return new Proxy(this, this);
        }
        get(t, p) {
            switch (p) {
                default:
                    return t.data[p];
                    break;
                case 'all':
                    return this.data;
                    break;
                case 'length':
                    return Object.keys(this.data).length;
                    break;
            }
        }
        set(t, p, v) {
            t.data[p] = v;
        }
    },
    _Star: class {
        constructor(d) {
            this.data = d.filter(onlyUnique);
            return new Proxy(this, this);
        }
        get(t, p) {
            switch (p) {
                default:
                    return t.data[p];
                    break;
                case 'all':
                    return this.data;
                    break;
                case 'length':
                    return Object.keys(this.data).length;
                    break;
            }
        }
        set(t, p, v) {
            t.data[p] = v;
        }
    },
    //Chance
    _Coin() {
        return [true, false][randomInt(0, 1)];
    }
};