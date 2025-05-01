import * as productService from "./products.js";
import query from "./database/database.js";

async function testCRUD() {
  try {
    // 1. Criar tabela
    await productService.createTable();
    console.log("✅ Tabela criada com sucesso");

    // 2. Adicionar produtos
    await productService.addProduct({ name: "Notebook", price: 4500.0 });
    await productService.addProduct({ name: "Smartphone", price: 2500.0 });
    console.log("✅ Produtos adicionados");

    // 3. Listar todos os produtos
    const allProducts = await productService.getProducts();
    console.log("📦 Todos os produtos:", allProducts);

    // 4. Buscar um produto específico
    const firstProduct = allProducts[0];
    const productById = await productService.getProductById(firstProduct.id);
    console.log("🔍 Produto por ID:", productById);

    // 5. Atualizar um produto
    await productService.updateProduct(firstProduct.id, {
      name: "Notebook Premium",
      price: 5000.0,
    });
    const updatedProduct = await productService.getProductById(firstProduct.id);
    console.log("🔄 Produto atualizado:", updatedProduct);

    // 6. Deletar um produto
    await productService.deleteProduct(firstProduct.id);
    const remainingProducts = await productService.getProducts();
    console.log("🗑️ Produtos restantes:", remainingProducts);
  } catch (error) {
    console.error("❌ Erro durante os testes:", error);
  }
}

testCRUD();
