const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const shortid = require("shortid");

const app = express();

mongoose.connect('mongodb+srv://michal:Listopad2015@cluster0-ew9fu.mongodb.net/shoppingcart2?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('dataBase connected')
}).catch(err => console.log(err));

const Product = mongoose.model('products', new mongoose.Schema({
    // _id: { type: shortid.generate() },
    image: String,
    title: String,
    description: String,
    availableSizes: [String],
    price: Number
}))

app.use(bodyParser.json());

app.get('/api/products', async (req, res, next) => {
    const products = await Product.find({});
    res.send(products);
})

app.post('/api/products', async (req, res, next) => {
    const newProduct = new Product(req.body);
    console.log(req.body)
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
})

app.delete("/api/products/:id", async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
  });

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"));