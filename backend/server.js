const express = require('express');
const app = express();
const cors = require('cors');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Welcome Bakery 😎🚀👀');
});

/* ================= PRODUCTS ================= */

app.get('/products', async (req, res) => {
    try{
        const products = await prisma.product.findMany();
        res.status(200).json(products);
    } catch (error) {
        console.log("Error details: ", error);
        res.status(500).json({ error: "حصلت مشكلة وإحنا بنجيب المنتجات!", details: error.message});
    }
});

app.get('/products/:id', async (req, res) => {
    try{
        const data = Number(req.params.id);
        console.log("Id data: ", data);
        const product = await prisma.product.findUnique({ where: {id: data}});
        if (!product) {
            return res.status(404).json({ error: "المنتج ده مش موجود!" });
        }
        res.status(200).json(product);
    } catch (error){
        console.log("Error details: ", error);
        res.status(500).json({error: "حصلت مشكلة في جلب المنتج ده!"});
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
        res.status(200).json({successMsg: "تمام! اتحدث بنجاح", data: updatedData});
    } catch (error) {
        console.log("Error details: ", error);
        res.status(500).json({error: "حصل خطأ وإحنا بنحدث البيانات"});
    }
});

app.post('/products', async (req, res) => {
    try{
        const data = req.body
        console.log("data from body: ", req.body);
        const newProduct = await prisma.product.create({data: data});
        res.status(201).json({status: "المنتج اتضاف بنجاح!", data: newProduct});
    } catch (error) {
        console.log("Error details: ", error);
        res.status(500).json({ error: "حصلت مشكلة وإحنا بنضيف المنتج!", details: error.message });
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
            status: "تمام! المنتج اتمسح بنجاح 🗑️.", 
            deletedProduct: deletedProduct
        });
        console.log("Product with ID: ", data, " deleted successfully.");
        
    } catch (error) {
        console.log("Error details: ", error);
        res.status(500).json({ errorMsg: "حصلت مشكلة وإحنا بنمسح المنتج ده!", error: error.message });
    }
});

/* ================= INGREDIENTS ================= */

app.get('/ingredients', async (req, res) => {
    try{
        const ingredients = await prisma.ingredient.findMany();
        res.status(200).json(ingredients);
    } catch (error) {
        console.log("Error details: ", error);
        res.status(500).json({ error: "حصلت مشكلة وإحنا بنجيب المواد الخام!", details: error.message});
    }
});

app.get('/ingredients/:id', async (req, res) => {
    try{
        const data = Number(req.params.id);
        const ingredient = await prisma.ingredient.findUnique({ where: {id: data}});
        if (!ingredient) {
            return res.status(404).json({ error: "المادة دي مش موجودة!" });
        }
        res.status(200).json(ingredient);
    } catch (error){
        console.log("Error details: ", error);
        res.status(500).json({error: "حصلت مشكلة في جلب المادة دي!"});
    }
});

app.post('/ingredients', async (req, res) => {
    try{
        const data = req.body;
        const newIngredient = await prisma.ingredient.create({data: data});
        res.status(201).json({status: "المادة الخام اتضافت بنجاح!", data: newIngredient});
    } catch (error) {
        console.log("Error details: ", error);
        res.status(500).json({ error: "حصلت مشكلة وإحنا بنضيف المادة!", details: error.message });
    }
});

app.put('/ingredients/:id', async (req, res) => {
    try{
        const dataId = Number(req.params.id);
        const newData = req.body;
        const updatedIngredient = await prisma.ingredient.update({
            where: {id: dataId}, 
            data: newData
        });
        res.status(200).json({successMsg: "تمام! اتحدثت بنجاح", data: updatedIngredient});
    } catch (error) {
        console.log("Error details: ", error);
        res.status(500).json({error: "حصلت مشكلة وإحنا بنحدث البيانات"});
    }
});

app.delete('/ingredients/:id', async (req, res) => {
    try {
        const data = Number(req.params.id);
        const deletedIngredient = await prisma.ingredient.delete({
            where: { id: data }
        });
        res.status(200).json({ 
            status: "تمام! اتمسحت بنجاح 🗑️", 
            deletedIngredient: deletedIngredient
        });
    } catch (error) {
        console.log("Error details: ", error);
        res.status(500).json({ errorMsg: "حصلت مشكلة وإحنا بنمسح المادة دي!", error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running powerfully on Port ${PORT}`);
});