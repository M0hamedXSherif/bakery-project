const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const Database = require('better-sqlite3');


const sqlite = new Database('./dev.db');
const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });

async function main() {
  const newProduct = await prisma.product.create({
    data: {
      name: "Roll Bun",
      price: 3,
      stock: 50,
    },
  });

  console.log("The order was added successfully 👋⚡", newProduct);
}

main();
