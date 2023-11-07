const CyclicDb = require("@cyclic.sh/dynamodb");
const db = CyclicDb("good-gold-zebra-kiltCyclicDB");

const animals = db.collection("animals");
// create an item in collection with key "leo"
let leo = animals.set("leo", {
    type: "cat",
    color: "orange"
});

// get an item at key "leo" from collection animals
//let item = animals.get("leo");
//console.log(item);
//*/