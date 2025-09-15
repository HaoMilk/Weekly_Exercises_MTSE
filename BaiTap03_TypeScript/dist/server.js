"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = __importDefault(require("./models"));
const web_1 = __importDefault(require("./routes/web"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/', web_1.default);
(async () => {
    try {
        await models_1.default.sequelize.authenticate();
        console.log('✅ DB connected');
    }
    catch (err) {
        console.error('❌ DB connection error:', err?.message || err);
    }
})();
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
exports.default = app;
