import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors';

const prisma = new PrismaClient()
const app =express()

app.use(cors());
app.use(express.json())


app.post('/usuarios', async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                name: req.body.name,
                age: req.body.age
            }
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: "Erro ao criar usuário", details: error.message });
    }
});



app.get('/usuarios', async (req , res)=>{

   const users = await prisma.user.findMany()

    res.status(200).json(users)
})

app.put('/usuarios/:id', async (req, res) => {
    try {
        const user = await prisma.user.update({
            where: { id: req.params.id },
            data: {
                email: req.body.email,
                name: req.body.name,
                age: req.body.age
            }
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: "Usuário não encontrado" });
    }
});

app.delete('/usuarios/:id', async (req, res) => {
    try {
        await prisma.user.delete({
            where: { id: req.params.id }
        });
        res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
        res.status(404).json({ error: "Usuário não encontrado" });
    }
});
export default app;
