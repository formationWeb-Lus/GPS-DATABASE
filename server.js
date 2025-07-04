// backend/server.js ou app.js (selon ta config)
const express = require('express');
const app = express();
app.use(express.json());
const pendingRouter = require('./routes/pendingAccounts');

const usersRouter = require('./routes/users');

const authRoutes = require('./routes/authRoutes');
const testRoute = require('./routes/test');
app.use('/api/test-db', testRoute)
app.use('/api/pending', pendingRouter);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRouter); // 🔗 Cette ligne est importante

// Autres routes...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
