import postgres from "postgres";
import dotenv from 'dotenv';

// Configura o dotenv para carregar as variáveis de ambiente do arquivo .env
dotenv.config();

// Desestruturação das variáveis de ambiente
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

// Decodifica a senha, se necessário
PGPASSWORD = decodeURIComponent(PGPASSWORD);

// Exporta a conexão com o PostgreSQL configurada
export const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false // Configuração para permitir conexões SSL sem certificados
  },
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});
