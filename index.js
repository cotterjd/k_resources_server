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
const express_1 = __importDefault(require("express"));
const csvtojson_1 = __importDefault(require("csvtojson"));
const app = (0, express_1.default)();
app.use((req, res, next) => {
    res.header({
        "Access-Control-Allow-Origin": "*",
        "Access-Conrol-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": ["GET"]
    });
    if (req.method === "OPTIONS")
        return res.end("");
    next();
});
app.get(`/resources`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, csvtojson_1.default)().fromFile(`./data.csv`);
        return res.json(data);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: `Error finding or parsing file` });
    }
}));
const port = process.env.$PORT || 4000;
app.listen(port, () => {
    console.log(`Server running on port`, port);
});
