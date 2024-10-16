import app from './api/app';

const PORT = process.env.PORT || 3001;

const startServer = async () => {
    app.listen(PORT, () => {
        console.log(`API Server Started at ${PORT}`);
    });
};

startServer().catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
});