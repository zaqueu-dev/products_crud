import { useState } from "react";

export default function Form() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, price: parseFloat(price) }),
      });

      if (!res.ok) throw new Error("Erro ao cadastrar produto");
      const data = await fetch("http://localhost:3000", {
        method: "GET",
      });
      const productsData = await data.json();
      console.log("productsData: ", productsData);
      if (Array.isArray(productsData)) {
        setProducts(productsData); // Atualiza o estado com os produtos
      } else {
        console.error("A resposta não é um array:", productsData);
      }

      console.log("✅ Produto cadastrado!");
      setName(""); // Limpa o formulário
      setPrice("");
    } catch (err) {
      console.error("❌ Erro:", err.message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="p-10 bg-gray-200 border gap-10 flex flex-col w-96"
      >
        <input
          type="text"
          placeholder="Nome do produto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-5 bg-white border"
          required
        />
        <input
          type="number"
          placeholder="Preço do produto"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-5 bg-white border"
          required
        />
        <button type="submit" className="p-5 bg-white border hover:bg-gray-300">
          Cadastrar
        </button>
      </form>
      <div className="mt-10">
        <h2>Produtos Cadastrados:</h2>
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              {product.name} - R${Number(product.price).toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
