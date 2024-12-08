const http = require("http");
const fs = require("fs");
const path = require("path");

const TIME = 3;
const data = Array.from({ length: 6 * TIME }, (_, i) => i.toString(26)).join(
  ""
);
console.log(data);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const server = http.createServer(async (req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(fs.readFileSync(path.join(__dirname, "index.html")));
  }

  if (req.url === "/data") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    // 先写入一个空字符串 让 fetch resolve
    res.write("");
    let i = 0;
    const chunkSize = 6;
    await sleep(1000);
    const interval = setInterval(() => {
      res.write(data.slice(i, i + chunkSize));
      i += chunkSize;

      if (i >= data.length) {
        clearInterval(interval);
        res.end();
      }
    }, 1000);
  }
});

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
