import express from 'express';
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const LeerData = () => {
    try {
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error al leer los datos", error);
        return null;
    }
}

const EscribirData = (data) => {
    try {
        fs.writeFileSync("./db.json" , JSON.stringify(data));
    } catch (error) {
        console.error("Error al escribir los datos", error);
        return null;
    }
}

app.post("/Obras", (req, res) => {
    const data = LeerData();
    const body = req.body;
    const newObra = {
        id: data.Obras.length + 1, 
        ...body,
    };
    
    data.Obras.push(newObra);
    EscribirData(data);
    res.json(newObra);
});

app.get("/Obras", (req, res) => {
    const data = LeerData();
    res.json(data.Obras);
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
