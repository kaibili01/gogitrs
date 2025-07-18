import "dotenv/config.js";
import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Helpers for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";

// Load config.json based on current environment
const configPath = path.resolve(__dirname, "../config/config.json");
const config = JSON.parse(fs.readFileSync(configPath))[env];

// Initialize db and Sequelize
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Dynamically import all models from this directory
const modelFiles = fs.readdirSync(__dirname).filter(
  (file) =>
    file.indexOf(".") !== 0 &&
    file !== basename &&
    file.endsWith(".js")
);

for (const file of modelFiles) {
  const { default: modelDefiner } = await import(path.join(__dirname, file));
  const model = modelDefiner(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

// Apply model associations
for (const modelName of Object.keys(db)) {
  if (typeof db[modelName].associate === "function") {
    db[modelName].associate(db);
  }
}

// Add Sequelize references to db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Sync options
const syncOptions = { force: process.env.NODE_ENV === "test" };

// Sync DB
await sequelize.sync(syncOptions);

export default db;
