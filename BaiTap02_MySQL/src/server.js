const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./models');
const webRoutes = require('./routes/web');


dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;


// Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// View engine EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Static files (tùy chọn)
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use('/', webRoutes);


// DB check
(async () => {
try {
await db.sequelize.authenticate();
console.log('✅ DB connected');
} catch (err) {
console.error('❌ DB connection error:', err.message);
}
})();


app.listen(PORT, () => {
console.log(`Server running at http://localhost:${PORT}`);
});