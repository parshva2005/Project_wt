const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const product = require('./HomeSchema.js');
const Cart = require('./CartSchema.js');
const cors = require('cors');

const ConnectionString = 'mongodb+srv://parshvamehta:parshva123@cluster0.79d2i.mongodb.net/Project'
mongoose.connect(ConnectionString).then(()=>{
    const app = express();
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cors());
    app.use(express.json());
    app.get('/product',async (req, res)=>{
        const ans = await product.find();
        res.send(ans);
    });
    app.get('/product/:id',async (req, res)=>{
        try {
            const productItem = await product.findOne({id:req.params.id});
            if (!productItem) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(productItem);
        } catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
        // const searchName = req.params.name;
        // try {
        //     const products = await product.find({ name: { $regex: searchName, $options: 'i' } });
        //     res.json(products);
        // } catch (error) {
        //     res.status(500).json({ message: 'Server Error', error });
        // }
    });
    app.get('/product/search/:name', async (req, res) => {
        const searchString = req.params.name.searchValue;

        const products = await product.find({
            $or: [
                { name: { $regex: searchString, $options: 'i' } }
            ],
        });
        
        res.json(products);
       
    });
    app.post('/product',async (req, res)=>{
        console.log(req.body);
        const newProduct = new product({...req.body});
        await newProduct.save();
        res.send("Inserted Product");
    }); 
    app.delete('/product/:id',async (req, res)=>{
        try {
            const productItem = await product.deleteOne({id : req.params.id});
            if (!productItem) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(productItem);
        } catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    });
    app.patch('/product/:id',async (req, res)=>{
        try {
            const productItem = await product.findOne({id:req.params.id});
            if (!productItem) {
                return res.status(404).json({ message: 'Product not found' });
            }
            productItem.price = req.body.price;
            productItem.quantity = req.body.quantity;
            productItem.name = req.body.name;
            productItem.description = req.body.description;
            productItem.date = req.body.date;
            res.status(200).json(productItem);
        } catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    });
    app.get('/cart',async (req, res)=>{
        const ans = await Cart.find();
        res.send(ans);
    });
    app.get('/cart/:id',async (req, res)=>{
        try {
            const cartItem = await Cart.CartProduct.findOne({id:req.params.id});
            if (!cartItem) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(cartItem);
        } catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    });
    app.post('/cart',async (req, res)=>{
        try {
            if (!req.body) {
              return res.status(400).send({ message: 'No request body provided' });
            }
            const newProduct = new Cart.CartProduct({ ...req.body });
            await newProduct.save();
            res.send({ message: 'Product inserted into cart successfully' });
          } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error inserting product into cart' });
          }
    });
    app.post('/cart/:id' , async (req, res) => {
        const cartItem = await Cart.findOne({});
        const temp = cartItem.CartProduct.findIndex((p)=>p.id === req.params.id);
        const pro = await product.findOne({ id: req.params.id});
        if (temp === -1 ) {
            await cartItem.CartProduct.push(pro);
            await cartItem.save();
            res.status(201).send("Product Added/Updated");
        }else{
            res.status(409).send("Product Already exists");
        }
        // if(temp == -1){
        //     const result = await cartItem.CartProduct.push(pro);
        //     await cartItem.save();
        //     res.status(201).send("Product Added");
        // }else{
        //     res.status(409).send("Product Already exists");
        // }
    });  
    app.delete('/cart/:id',async (req, res)=>{
        const cart = await Cart.findOne({});
        const temp = cart.CartProduct.findIndex((p)=>p.id === req.params.id);
        const result = await cart.CartProduct.splice(temp,1);
        cart.save();
        res.status(201).send("Product removed");
    });
    app.delete('/cart',async (req, res)=>{
        const cart = await Cart.find();
        const temp = cart[0].CartProduct.findIndex((p)=>p.id === req.params.id);
        const result = await cart[0].CartProduct.splice(temp,1);
        cart[0].save();
        res.status(201).send("Product removed");
    });
    app.patch('/cart/:id',async (req, res)=>{
        const { delta } = req.body;
        try { 
            const cartItem = await Cart.findOne({});
            const temp = cartItem.CartProduct.findIndex((p)=>p.id === req.params.id);
            if (temp == -1) {
                if (!cartItem.CartProduct[temp]) {
                    cartItem.CartProduct[0].quantity += delta;
                    await cartItem.save();
                    res.status(200).send('Quantity updated');
                }else{
                    res.status(404).send('Product is not found in cart');
                }
            }else {
                res.status(404).send('Product not found in cart');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Error updating quantity');
        }
    });
    app.get('/order',async (req, res)=>{
        const ans = await Cart.find();
        res.send(ans);
    });
    app.post('/order', async (req, res) => {
        const { date, products } = req.body;
      
        if (!products || !Array.isArray(products)) {
          return res.status(400).send("Invalid products array");
        }
      
        try {
          const cart = await Cart.findOne({});
          products.forEach((product) => {
            cart.OrderProduct.push({ ...product, date });
          });
          cart.CartProduct = [];
          await cart.save();
          res.status(201).send("Order placed successfully");
        } catch (error) {
          console.error(error);
          res.status(500).send("Error placing order");
        }
    });
    app.listen(3020,()=>{
        console.log('listening on port 3020');
    });
}); 