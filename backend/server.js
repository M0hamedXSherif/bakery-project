const express = require('express');
const app = express();
const cors = require('cors');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function verifyOwner(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "لازم تسجل دخول الأول!" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "owner") {
            return res.status(403).json({ error: "مش مسموح لك تعمل الحاجة دي!" });
        }

        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({ error: "الجلسة انتهت أو التوكن مش صحيح، سجل دخول تاني!" });
    }
}

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
        const newData = req.body;
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

app.post('/ingredients', verifyOwner, async (req, res) => {
    try{
        const data = req.body;
        const newIngredient = await prisma.ingredient.create({data: data});
        res.status(201).json({status: "المادة الخام اتضافت بنجاح!", data: newIngredient});
    } catch (error) {
        console.log("Error details: ", error);
        res.status(500).json({ error: "حصلت مشكلة وإحنا بنضيف المادة!", details: error.message });
    }
});

app.put('/ingredients/:id', verifyOwner, async (req, res) => {
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

app.delete('/ingredients/:id', verifyOwner, async (req, res) => {
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

/* ================= REGISTER ================= */

app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                role: "staff",
                isApproved: false
            }
        });

        res.status(201).json({ 
            successMsg: "تم التسجيل بنجاح! محتاج موافقة صاحب المخبز الأول قبل ما تقدر تدخل.", 
            id: newUser.id, 
            email: newUser.email
        });
    } catch (error) {
        console.log("Error details: ", error);
        res.status(500).json({ error: "حصلت مشكلة وإحنا بنسجلك، جرب تاني!", details: error.message });
    }
});

/* ================= LOGIN ================= */

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email: email } });

        if (!user) {
            return res.status(404).json({ error: "كلمة السر او الايميل غلط!" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ error: "الايميل او كلمة السر غلط!" });
        }

        if (!user.isApproved) {
            return res.status(403).json({ error: "حسابك لسه مستني موافقة صاحب المخبز!" });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({ 
            successMsg: "تم تسجيل الدخول بنجاح!", 
            token: token, 
            role: user.role,
            email: user.email
        });

    } catch (error) {
        console.log("Error details: ", error);
        res.status(500).json({ error: "حصلت مشكلة وإحنا بنسجل دخولك!" });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running powerfully on Port ${PORT}`);
});