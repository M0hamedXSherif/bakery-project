const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Welcome Bakery 😎🚀👀');
});

app.get('/products', async (req, res) => {
    try{
        const products = await prisma.product.findMany();
        res.status(200).json(products);
    } catch (error) {
        console.log("Error details: ", error);
        res.status(500).json({ error: "A problem happend while bringing the products!", details: error.message});
    }
});

app.get('/products/:id', async (req, res) => {
    try{
        const data = Number(req.params.id);
        console.log("Id data: ", data);
        const product = await prisma.product.findUnique({ where: {id: data}});
        res.status(200).json({successMsg: "Id arrived!", id: product.id, name: product.name, price: product.price});
    } catch (error){
        console.log("Error details: ", error);
        res.status(500).json({error: "Hmm.. it seems like something went wrong!"});
    }
});

app.put('/products/:id', async (req, res) => {
    try{
        const dataId = Number(req.params.id);
        console.log("request ID : ", dataId);
        const newData = req.body;
        console.log("Data in body: ", newData);
        const updatedData = await prisma.product.update({
            where: {id: dataId}, 
            data: newData
        });
        res.status(200).json({successMsg: "Yep! Updated successfully", name: newData.name, price: newData.price, stock: newData.stock});
    } catch (error) {
        console.log("Error details: ", error);
        res.status(500).json({error: "Oops! faild to Update data"});
    }
});

app.post('/add', async (req, res) => {
    try{
        const data = req.body
        console.log("data from body: ", req.body);
        const newProduct = await prisma.product.create({data: data});
        res.status(201).json({status: "order added successfully!", data: newProduct});
    } catch (error) {
        console.log("Error details: ", error);
        res.status(500).json({ error: "A problem happened while adding the product!", details: error.message });
    }
});

app.delete('/products/:id', async (req, res) => {
    try {
        const data = Number(req.params.id);
        console.log("ID came from Client: ", data);
        const deletedProduct = await prisma.product.delete({
            where: { id: data }
        });
        res.status(200).json({ 
            status: "Success! ID deleted successfully 🗑️.", 
            deletedProduct: deletedProduct
        });
        console.log("Product with ID: ", data, " deleted successfully.");
        
    } catch (error) {
        console.log("Error details: ", error);
        res.status(500).json({ errorMsg: "Error while deleting this Item!", error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running powerfully on Port ${PORT}`);
});