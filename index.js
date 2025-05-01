import http from "http";
import dotenv from "dotenv";
import parse from "url";

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const pathname = parse(req.url).pathname;

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World!");
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
