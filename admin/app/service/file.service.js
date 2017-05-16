"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/share");
var FileService = (function () {
    function FileService() {
    }
    FileService.prototype.upload = function (type, blob) {
        if (type === void 0) { type = null; }
        return new Promise(function (resolve, reject) {
            if (!blob)
                throw new TypeError('blob not set');
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/file/' + type, true);
            xhr.addEventListener('readystatechange', function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200)
                        resolve(JSON.parse(xhr.response));
                    else
                        reject(xhr.response);
                }
            });
            xhr.send(blob);
        });
    };
    FileService.prototype.uploadImage = function (file) {
        var _this = this;
        if (file === void 0) { file = null; }
        return new Promise(function (resolve, reject) {
            if (!file)
                return reject(new TypeError('file not set'));
            var fileReader = new FileReader();
            fileReader.addEventListener('load', function () {
                var img = new Image();
                img.addEventListener('load', function () {
                    var cnv = document.createElement('canvas');
                    cnv.width = img.naturalWidth;
                    cnv.height = img.naturalHeight;
                    var ctx = cnv.getContext('2d');
                    ctx.scale(1, 1);
                    ctx.drawImage(img, 0, 0);
                    var dataurl = cnv.toDataURL('image/jpeg', 0.92);
                    var bstr = atob(dataurl.split(',')[1]);
                    var n = bstr.length;
                    var u8arr = new Uint8Array(n);
                    while (n--)
                        u8arr[n] = bstr.charCodeAt(n);
                    _this.upload('jpg', new Blob([u8arr], { type: 'image/jpeg' })).then(function (response) { return resolve(response); });
                }, false);
                img.addEventListener('error', function () { return reject(new Error('Convert image error')); }, false);
                img.src = fileReader.result;
            });
            fileReader.readAsDataURL(file);
        });
    };
    FileService.prototype.uploadPdf = function (file) {
        var _this = this;
        if (file === void 0) { file = null; }
        return new Promise(function (resolve, reject) {
            if (!file)
                return reject(new TypeError('file not set'));
            var fileReader = new FileReader();
            fileReader.addEventListener('load', function () {
                var dataurl = fileReader.result;
                var bstr = atob(dataurl.split(',')[1]);
                var n = bstr.length;
                var u8arr = new Uint8Array(n);
                while (n--)
                    u8arr[n] = bstr.charCodeAt(n);
                _this.upload('pdf', new Blob([u8arr], { type: 'application/pdf' })).then(function (response) { return resolve(response); });
            });
            fileReader.readAsDataURL(file);
        });
    };
    return FileService;
}());
FileService = __decorate([
    core_1.Injectable()
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map