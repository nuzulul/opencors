"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenCORS = void 0;
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
class OpenCORS {
    constructor({ port, front }) {
        const serverport = port || process.env.PORT || 8080;
        const server = http_1.default.createServer((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.setHeader('Access-Control-Allow-Origin', '*');
            function isvalidurl(url) {
                try {
                    return !!(new URL(url));
                }
                catch (e) {
                    return false;
                }
            }
            function get(targeturl, resolve) {
                https_1.default.get(targeturl, res => {
                    if ((res.statusCode === 301 || res.statusCode === 302) && (res.headers.location != undefined)) {
                        return get(res.headers.location, resolve);
                    }
                    let data = [];
                    res.on('data', chunk => { data.push(chunk); });
                    res.on('end', () => {
                        try {
                            const raw = Buffer.concat(data).toString();
                            resolve(raw);
                        }
                        catch (err) {
                            let msg = JSON.stringify({ status: 'error', msg: err, targeturl });
                            resolve(msg);
                        }
                    });
                });
            }
            function get_page(targeturl) {
                return __awaiter(this, void 0, void 0, function* () {
                    return new Promise((resolve) => {
                        get(targeturl, resolve);
                    });
                });
            }
            let body = 'OpenCors<br>' +
                'OpenCORS is a simple NodeJS based CORS Proxy<br>' +
                'https://github.com/nuzulul/opencors<br><br>' +
                'Usage :<br>' + req.headers.host + '/?url=<br><br>' +
                'Agent:<br>' + ((_a = req.headers['user-agent']) !== null && _a !== void 0 ? _a : "Unknown") + '<br><br>' +
                'Demo:<br>' +
                'Input Url <input type="text" id="input"/><button id="button" onclick="location.href=\'/?url=\'+document.getElementById(\'input\').value">Submit</button>';
            if (front != undefined)
                body = front;
            let requrl = req.url;
            requrl = requrl.startsWith('/') ? 'http://' + req.headers.host + req.url : req.url;
            const targeturl = (new URL(requrl)).searchParams.get("url");
            if (isvalidurl(targeturl)) {
                const rawdata = yield get_page(targeturl);
                body = rawdata;
            }
            else if (targeturl != null) {
                body = JSON.stringify({ status: 'error', msg: 'Invalid target url', targeturl });
            }
            else {
                res.setHeader('Content-Type', 'text/html');
            }
            res.end(body);
        }));
        server.listen(serverport, () => {
            console.log(`Server running at ${serverport}`);
        });
    }
}
exports.OpenCORS = OpenCORS;
