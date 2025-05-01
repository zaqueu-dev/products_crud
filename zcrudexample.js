import { query } from "./backend/database/database.js";

// 1. Cria a tabela (se não existir)
export async function createTable() {
  return await query(`
    CREATE TABLE IF NOT EXISTS produtos (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      preco DECIMAL(10, 2) NOT NULL,
      estoque INT NOT NULL,
      descricao TEXT
    )
  `);
}

// 2. Insere 3 produtos
export async function insertProdutos() {
  const produtos = [
    {
      nome: "Notebook",
      preco: 4500.0,
      estoque: 10,
      descricao: "16GB RAM, SSD 512GB",
    },
    {
      nome: "Smartphone",
      preco: 2500.0,
      estoque: 20,
      descricao: 'Tela 6.5", 128GB',
    },
    { nome: "Tablet", preco: 1500.0, estoque: 15, descricao: 'Tela 10", 64GB' },
  ];

  for (const produto of produtos) {
    await query(
      `INSERT INTO produtos (nome, preco, estoque, descricao) VALUES ($1, $2, $3, $4)`,
      [produto.nome, produto.preco, produto.estoque, produto.descricao]
    );
  }
}

// 3. Consulta todos os produtos
export async function getProdutos() {
  const res = await query("SELECT * FROM produtos");
  return res.rows;
}

// 4. Consulta um produto por ID
export async function getProdutoById(id) {
  const res = await query("SELECT * FROM produtos WHERE id = $1", [id]);
  return res.rows[0];
}

// 5. Atualiza o preço de um produto
export async function updatePreco(id, novoPreco) {
  await query("UPDATE produtos SET preco = $1 WHERE id = $2", [novoPreco, id]);
}

// 6. Deleta um produto
export async function deleteProduto(id) {
  await query("DELETE FROM produtos WHERE id = $1", [id]);
}
