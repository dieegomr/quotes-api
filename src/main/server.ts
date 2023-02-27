import app from './config/app';

const port = process.env.PORT || 8000;

app.listen(port, () =>
  console.log(`server runnig at: http://localhost:${port}`)
);
