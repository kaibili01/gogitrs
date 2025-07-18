import db from "../models/db.js"; // Make sure your db file uses ES exports too

export default function (app) {
  // Example: Create a new entry via GraphQL POST (though usually GraphQL doesn't go here)
  app.post("/graphql", (req, res) => {
    db.Example.create(req.body)
      .then((dbExample) => {
        res.json(dbExample);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Uncomment and update if needed:
  /*
  app.get("/api/examples", (req, res) => {
    db.Example.findAll()
      .then((dbExamples) => {
        res.json(dbExamples);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  app.delete("/api/examples/:id", (req, res) => {
    db.Example.destroy({ where: { id: req.params.id } })
      .then((result) => {
        res.json({ deleted: result });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  */
}
