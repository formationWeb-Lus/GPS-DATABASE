const express = require('express');
const app = express();
app.use(express.json());

// 📌 Import des routes
const pendingRouter = require('./routes/pendingAccounts');
const usersRouter = require('./routes/users');
const authRoutes = require('./routes/auth'); // route pour login
const testRoute = require('./routes/test');
const verifyCodeRoute = require('./routes/verifyCode');

app.use('/api/verify-code', verifyCodeRoute);
// 📌 Utilisation des routes
app.use('/api/auth', authRoutes);         // /api/auth/login
app.use('/api/test-db', testRoute);       // /api/test-db
app.use('/api/pending', pendingRouter);   // /api/pending
app.use('/api/users', usersRouter);       // /api/users

// ✅ Port d’écoute
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
