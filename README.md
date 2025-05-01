# Como Criar uma Tabela no PostgreSQL

Vou explicar detalhadamente como criar tabelas no PostgreSQL, definindo colunas, tipos de dados e configurações importantes.

## Sintaxe Básica

```sql
CREATE TABLE nome_da_tabela (
  nome_coluna1 tipo_de_dado [restrições],
  nome_coluna2 tipo_de_dado [restrições],
  ...
);
```

## Tipos de Dados Mais Comuns

### Numéricos

- `INT` ou `INTEGER`: Números inteiros (-2147483648 a 2147483647)
- `SERIAL`: Auto-incremento (equivalente a INT + SEQUENCE)
- `DECIMAL(p,s)` ou `NUMERIC(p,s)`: Números exatos com precisão (p=total dígitos, s=decimais)
- `REAL` ou `FLOAT4`: Números de ponto flutuante (6 dígitos decimais)
- `DOUBLE PRECISION` ou `FLOAT8`: Números de ponto flutuante (15 dígitos decimais)

### Texto

- `VARCHAR(n)`: Texto com comprimento variável (max n caracteres)
- `CHAR(n)`: Texto com comprimento fixo (preenchido com espaços)
- `TEXT`: Texto de comprimento ilimitado

### Data/Hora

- `DATE`: Data (YYYY-MM-DD)
- `TIME`: Hora (HH:MM:SS)
- `TIMESTAMP`: Data e hora (YYYY-MM-DD HH:MM:SS)
- `TIMESTAMPTZ`: Data e hora com timezone

### Booleanos

- `BOOLEAN`: Valores TRUE, FALSE ou NULL

### Outros

- `JSON`: Dados no formato JSON
- `JSONB`: JSON binário (mais eficiente)
- `UUID`: Identificador universal único

## Restrições Comuns (Constraints)

- `PRIMARY KEY`: Chave primária (identificador único)
- `UNIQUE`: Valores devem ser únicos na coluna
- `NOT NULL`: Não pode conter valores nulos
- `DEFAULT valor`: Valor padrão quando não especificado
- `CHECK (condição)`: Validação personalizada
- `REFERENCES tabela(coluna)`: Chave estrangeira

## Exemplo Completo

```sql
CREATE TABLE produtos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT,
  preco DECIMAL(10,2) NOT NULL CHECK (preco > 0),
  estoque INT NOT NULL DEFAULT 0,
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ativo BOOLEAN DEFAULT TRUE,
  categoria_id INT REFERENCES categorias(id)
);
```

## Como Executar no Node.js

Usando o código do seu Pool de conexões:

```javascript
async function criarTabelaProdutos() {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS produtos (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        descricao TEXT,
        preco DECIMAL(10,2) NOT NULL CHECK (preco > 0),
        estoque INT NOT NULL DEFAULT 0,
        data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Tabela criada com sucesso!");
  } catch (err) {
    console.error("Erro ao criar tabela:", err);
  }
}

// Chamar a função
criarTabelaProdutos();
```

## Dicas Importantes

1. **IF NOT EXISTS**: Evita erros se a tabela já existir
2. **Nomes de tabelas/colunas**: Use snake_case (padrão SQL)
3. **Chaves primárias**: Sempre defina uma PRIMARY KEY
4. **Valores padrão**: Úteis para campos como data_cadastro
5. **Restrições**: Aproveite CHECK para validações simples

## Como Verificar se a Tabela Foi Criada

Você pode verificar no psql (terminal do PostgreSQL) com:

```sql
\d produtos
```

Ou via Node.js:

```javascript
async function verificarTabela() {
  const res = await query(`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'produtos'
  `);
  console.log(res.rows);
}
```

CREATE DATABASE nome_do_seu_banco;
CREATE USER zaqueu WITH PASSWORD 'sua_senha';
GRANT ALL PRIVILEGES ON DATABASE nome_do_seu_banco TO zaqueu;
\q
