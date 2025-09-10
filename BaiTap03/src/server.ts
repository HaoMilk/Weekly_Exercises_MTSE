import app from './app';
const port = Number(process.env.PORT || 4000);

app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});
