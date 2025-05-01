import * as productService from "./products.js";
import http from "http";
import { parse } from "url";

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  const pathname = parse(req.url).pathname;
  console.log("Request received for:", pathname);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (pathname === "/" && req.method === "GET") {
    console.log("Handling GET request");
    const products = await productService.getProducts();
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(products));
  } else if (pathname === "/" && req.method === "POST") {
    console.log("Handling POST request");

    let body = "";

    req.on("data", (chunk) => (body += chunk));

    req.on("end", async () => {
      try {
        console.log("Body received:", body);
        const data = JSON.parse(body);
        const { name, price } = data;

        if (name === undefined || price === undefined) {
          res.writeHead(400, { "content-type": "application/json" });
          return res.end(
            JSON.stringify({ error: "Missing one or more fields" })
          );
        }
        await productService.addProduct({ name, price });
        console.log("Produto adicionado com sucesso");
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "Produto adicionado com sucesso" }));
      } catch (error) {
        console.log("Erro:", error);
        res.writeHead(500, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Erro ao processar o produto" }));
      }
    });
  } else {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "Rota não encontrada" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
