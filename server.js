const fs = require("fs");
// Dependencies
// ===========================================================
const express = require("express");
const app = express();

const PORT = 3000;

// will share any static html files with the browser
app.use( express.static('html') )
// accept incoming POST requests
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

 
// Data =======================================================
let tableList = JSON.parse(fs.readFileSync("./data.json"));

// Routes (Endpoints) =========================================
app.get("/api/tables/:tableId", function(req, res) {
  const tableId = req.params.tableId  
  // get the table info
  const tableData = {}
  res.send( tableData );
});

app.get("/api/tables", function(req, res) {
  res.json( tableList );
});

app.post("/api/tables/reserve", function(req, res) {
  const newTableData = req.body
  console.log(newTableData)
  tableList.push(newTableData)
  fs.writeFileSync("./data.json", JSON.stringify(tableList));
  res.json( { message: `Saved: ${newTableData.name}` } );
});

// Listener ==================================================
app.listen(PORT, function() {
  console.log("Serving hot-tables on PORT " + PORT);
});