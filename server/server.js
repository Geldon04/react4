import express from "express";
import pg from "pg";
// import pg from '@vercel/postgres';
import cors from "cors";


const app = express();
const port = 3000;

const db = new pg.Client({
  connectionString: "postgres://default:yUnj7umMipd5@ep-square-hill-a776l438-pooler.ap-southeast-2.aws.neon.tech:5432/verceldb?sslmode=require?sslmode=require",
  POSTGRES_URL:"postgres://default:yUnj7umMipd5@ep-square-hill-a776l438-pooler.ap-southeast-2.aws.neon.tech:5432/verceldb?sslmode=require",
POSTGRES_PRISMA_URL:"postgres://default:yUnj7umMipd5@ep-square-hill-a776l438-pooler.ap-southeast-2.aws.neon.tech:5432/verceldb?sslmode=require&pgbouncer=true&connect_timeout=15",
POSTGRES_URL_NO_SSL:"postgres://default:yUnj7umMipd5@ep-square-hill-a776l438-pooler.ap-southeast-2.aws.neon.tech:5432/verceldb",
POSTGRES_URL_NON_POOLING:"postgres://default:yUnj7umMipd5@ep-square-hill-a776l438.ap-southeast-2.aws.neon.tech:5432/verceldb?sslmode=require",
POSTGRES_USER:"default",
POSTGRES_HOST:"ep-square-hill-a776l438-pooler.ap-southeast-2.aws.neon.tech",
POSTGRES_PASSWORD:"yUnj7umMipd5",
POSTGRES_DATABASE:"verceldb",
  // user: "postgres",
  // host: "localhost",
  // database: "keeper",
  // password: "Gequel04",
  // port: 5432,
});
db.connect();

app.use(cors());
app.use(express.json());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM notes ORDER BY id ASC");
    res.json(result.rows);

  } catch (err) {
    console.log(err);
  }
});

//create a new note
app.post("/add", async (req, res) => {
  const {title, details} = req.body;
  try {
    await db.query("INSERT INTO notes (title, details) VALUES ($1, $2)", [title, details]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

//delete a note
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteNote = await db.query("DELETE FROM notes WHERE id = $1", [id]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
