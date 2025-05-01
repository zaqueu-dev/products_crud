import query from "./database/database.js";

export async function createTable() {
  return await query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      price DECIMAL(10, 2) NOT NULL
    )
    `);
}

export async function addProduct({ name, price }) {
  try {
    const product = { name, price };
    await query(`INSERT INTO products (name, price) VALUES ($1, $2)`, [
      product.name,
      product.price,
    ]);
  } catch (error) {
    console.log("Erro: ", error);
  }
}

export async function getProducts() {
  const res = await query("SELECT * FROM products");
  return res.rows;
}

export async function getProductById(id) {
  const res = await query("SELECT * FROM products WHERE id = $1", [id]);
  return res.rows[0];
}

export async function updateProduct(id, { name, price }) {
  await query("UPDATE products SET name = $1, price = $2 WHERE id = $3", [
    name,
    price,
    id,
  ]);
}

export async function deleteProduct(id) {
  await query("DELETE FROM products WHERE id = $1", [id]);
}
