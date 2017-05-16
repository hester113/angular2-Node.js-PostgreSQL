"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var byteToHex = [];
for (var i = 0; i < 256; i++)
    byteToHex[i] = (i + 0x100).toString(16).substr(1);
var lastNSecs = 0;
var lastMSecs = 0;
var r = Math.random() * 0x100000000;
var clockseq = ((r >>> 16) << 8 | (r >>> 24)) & 0x3fff;
var UUID = (function () {
    function UUID(value) {
        if (value === void 0) { value = null; }
        this._uuid = UUID.generate();
        if (value) {
            if (!UUID.valid(value))
                throw new TypeError("'Value isn't correct UUIDv1");
            else
                this._uuid = value.toLowerCase();
        }
    }
    UUID.generate = function () {
        var uuid = [];
        var msecs = new Date().getTime();
        var nsecs = lastNSecs + 1;
        var dt = (msecs - lastMSecs) + (nsecs - lastNSecs) / 10000;
        if (dt < 0)
            clockseq = clockseq + 1 & 0x3fff;
        if (dt < 0 || msecs > lastMSecs)
            nsecs = 0;
        lastMSecs = msecs;
        lastNSecs = nsecs;
        msecs += 12219292800000;
        var i = 0;
        // time_low
        var t = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
        uuid[i++] = t >>> 24 & 0xff;
        uuid[i++] = t >>> 16 & 0xff;
        uuid[i++] = t >>> 8 & 0xff;
        uuid[i++] = t & 0xff;
        // time_mid
        t = (msecs / 0x100000000 * 10000) & 0xfffffff;
        uuid[i++] = t >>> 8 & 0xff;
        uuid[i++] = t & 0xff;
        // time_high_and_version
        uuid[i++] = t >>> 24 & 0xf | 0x10; // include version
        uuid[i++] = t >>> 16 & 0xff;
        // clock_seq_hi_and_reserved
        uuid[i++] = clockseq >>> 8 | 0x80;
        // clock_seq_low
        uuid[i++] = clockseq & 0xff;
        var rnds = new Array(16);
        for (var i_1 = 0, r_1; i_1 < 7; i_1++) {
            if ((i_1 & 0x03) === 0)
                r_1 = Math.random() * 0x100000000;
            rnds[i_1] = r_1 >>> ((i_1 & 0x03) << 3) & 0xff;
        }
        // node
        uuid[i] = rnds[0] | 0x01;
        for (var n = 1; n < 6; n++)
            uuid[i + n] = rnds[n];
        i = 0;
        return byteToHex[uuid[i++]] + byteToHex[uuid[i++]] +
            byteToHex[uuid[i++]] + byteToHex[uuid[i++]] + '-' +
            byteToHex[uuid[i++]] + byteToHex[uuid[i++]] + '-' +
            byteToHex[uuid[i++]] + byteToHex[uuid[i++]] + '-' +
            byteToHex[uuid[i++]] + byteToHex[uuid[i++]] + '-' +
            byteToHex[uuid[i++]] + byteToHex[uuid[i++]] +
            byteToHex[uuid[i++]] + byteToHex[uuid[i++]] +
            byteToHex[uuid[i++]] + byteToHex[uuid[i++]];
    };
    UUID.valid = function (value) {
        if (value === void 0) { value = null; }
        return !!value && /^[a-f0-9]{8}-[a-f0-9]{4}-1[a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(value);
    };
    Object.defineProperty(UUID.prototype, "uuid", {
        get: function () {
            return this._uuid;
        },
        enumerable: true,
        configurable: true
    });
    UUID.prototype.equal = function (value) {
        return this._uuid === value.uuid;
    };
    return UUID;
}());
exports.UUID = UUID;
function newDate(value) {
    if (value === void 0) { value = null; }
    var date = value ? new Date(value) : new Date();
    if (Number.isNaN(date.getTime()))
        return null;
    date.setHours(0, 0, 0, 0);
    return date;
}
exports.newDate = newDate;
function str2Date(value) {
    if (value === void 0) { value = null; }
    if (!value)
        return newDate();
    var _a = value.split('.').map(function (value) { return Number.parseInt(value); }), day = _a[0], month = _a[1], year = _a[2];
    return newDate(new Date(year, month - 1, day));
}
exports.str2Date = str2Date;
var MLString = (function () {
    function MLString(value) {
        if (value === void 0) { value = null; }
        for (var _i = 0, _a = MLString.Languages; _i < _a.length; _i++) {
            var key = _a[_i];
            this[key] = '';
        }
        if (typeof value === 'string')
            this[MLString.Languages[0]] = String(value);
        else if (value)
            for (var _b = 0, _c = MLString.Languages; _b < _c.length; _b++) {
                var key = _c[_b];
                if (key in value)
                    this[key] = String(value[key]);
            }
    }
    MLString.checkValid = function (value) {
        for (var key in value)
            if (value[key].length <= 0)
                return false;
        return true;
    };
    return MLString;
}());
MLString.Languages = ['en', 'ar'];
exports.MLString = MLString;
var Model = (function () {
    function Model(value) {
        if (value === void 0) { value = {}; }
        this.id = new UUID();
        if (value.id)
            this.id = value.id instanceof UUID ? value.id : new UUID(value.id);
        this.enable = value.enable === undefined ? true : Boolean(value.enable);
    }
    Model.prototype.toObject = function () {
        return {
            id: this.id.uuid,
            enable: this.enable
        };
    };
    Model.prototype.toString = function () {
        return JSON.stringify(this.toObject());
    };
    return Model;
}());
Model.__api = null;
Model.__primaryFields = ['id', 'enable', 'title'];
exports.Model = Model;
var File = (function () {
    function File(value) {
        if (value === void 0) { value = {}; }
        this.enable = value.enable === undefined ? true : Boolean(value.enable);
        this.title = String(value.title || '');
        this.link = String(value.link || '');
    }
    File.prototype.toObject = function () {
        return {
            enable: this.enable,
            title: this.title,
            link: this.link
        };
    };
    return File;
}());
exports.File = File;
exports.genCombinationsNorep = function (lengthOfAlphabet, lengthOfFigures) {
    var n = lengthOfAlphabet;
    var k = lengthOfFigures;
    if (k === 0)
        return [];
    if (k > n)
        k = n;
    var vector = [];
    for (var j = 0; j < k; j++)
        vector.push(j);
    var result = [];
    var gen_result = true;
    while (gen_result) {
        var comb = [];
        for (var x = 0; x < k; x++)
            comb.push(vector[x]);
        result.push(comb);
        gen_result = (function () {
            var j; //index
            //easy case, increase rightmost element
            if (vector[k - 1] < n - 1) {
                vector[k - 1]++;
                return true;
            }
            //find rightmost element to increase
            for (j = k - 2; j >= 0; j--)
                if (vector[j] < n - k + j)
                    break;
            //terminate if vector[0] == n - k
            if (j < 0)
                return false;
            //increase
            vector[j]++;
            //set right-hand elements
            while (j < k - 1) {
                vector[j + 1] = vector[j] + 1;
                j++;
            }
            return true;
        })();
    }
    return result;
};
exports.getCombinations = function (arr, k) {
    if (arr === void 0) { arr = []; }
    if (k === void 0) { k = 1; }
    var combinationList = exports.genCombinationsNorep(arr.length, k);
    var result = [];
    for (var _i = 0, combinationList_1 = combinationList; _i < combinationList_1.length; _i++) {
        var l = combinationList_1[_i];
        var line = {
            combination: [],
            remainder: []
        };
        for (var i = 0; i < arr.length; i++)
            if (l.indexOf(i) >= 0)
                line.combination.push(arr[i]);
            else
                line.remainder.push(arr[i]);
        result.push(line);
    }
    return result;
};
exports.getAllCombinations = function (arr) {
    if (arr === void 0) { arr = []; }
    var combinationList = [];
    for (var k = arr.length; k > 0; k--)
        combinationList = combinationList.concat(exports.getCombinations(arr, k));
    var result = [];
    for (var _i = 0, combinationList_2 = combinationList; _i < combinationList_2.length; _i++) {
        var line = combinationList_2[_i];
        var resultLine = [];
        resultLine.push(line.combination);
        if (line.remainder.length <= 0)
            result.push(resultLine);
        else if (line.remainder.length === 1) {
            resultLine.push(line.remainder);
            result.push(resultLine);
        }
        else {
            var subCombinationList = exports.getAllCombinations(line.remainder);
            for (var _a = 0, subCombinationList_1 = subCombinationList; _a < subCombinationList_1.length; _a++) {
                var subLine = subCombinationList_1[_a];
                result.push(resultLine.slice(0).concat(subLine));
            }
        }
    }
    return result;
};
exports.arrayComp = function (a, b) {
    if (a instanceof Array && b instanceof Array && a.length === b.length)
        return a.reduce(function (prev, valueA) {
            return prev && b.find(function (valueB) {
                if (valueA instanceof Array && valueB instanceof Array)
                    return exports.arrayComp(valueA, valueB);
                else
                    return valueA === valueB;
            }) !== undefined;
        }, true);
    return false;
};
exports.getAllUniqueCombinations = function (arr) {
    if (arr === void 0) { arr = []; }
    var vector = [];
    for (var j = 0; j < arr.length; j++)
        vector.push(j);
    var combinationList = exports.getAllCombinations(vector).reduce(function (prev, value) {
        if (prev.find(function (prevValue) { return exports.arrayComp(prevValue, value); }) === undefined)
            prev.push(value);
        return prev;
    }, []);
    var result = [];
    for (var _i = 0, combinationList_3 = combinationList; _i < combinationList_3.length; _i++) {
        var line = combinationList_3[_i];
        var newLine = [];
        for (var _a = 0, line_1 = line; _a < line_1.length; _a++) {
            var comb = line_1[_a];
            var newComb = [];
            for (var _b = 0, comb_1 = comb; _b < comb_1.length; _b++) {
                var i = comb_1[_b];
                newComb.push(arr[i]);
            }
            newLine.push(newComb);
        }
        result.push(newLine);
    }
    return result;
};
//# sourceMappingURL=common.js.map