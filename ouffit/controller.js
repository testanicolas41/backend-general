const fs = require('fs/promises');
const path = require('path');
const PANT_PATH = path.join(__dirname, './dto/pants.dto.json');
const SHIRT_PATH = path.join(__dirname, './dto/shirts.dto.json');

// Helper function

async function helperReadFile(path) {
    response = await fs.readFile(path, {encoding: 'utf-8'});
    if (!response) throw new Error(`No tiene contenido`);
    return JSON.parse(response)
}

async function helperGetById(path, id) {
    const array = await helperReadFile(path);
    const element = array.find(array => array.id = id);
    if (!element) throw new Error(`No se encontro el objeto con id ${id}`);
    return element;
}

async function helperWriteFile(path, idToUpdate, newData) {
    const array = await helperReadFile(path);
    const index = array.findIndex(item => item.id == idToUpdate);
    if (index == -1) throw new Error(`No se encontro el objeto con id ${idToUpdate}`);
    array[index] = { ...array[index], ...newData }
    await fs.writeFile(path, JSON.stringify(array, null, 2))
}

// Controllers function Pant

exports.getAllPants = async (req, res) => {
    try {
        const pants = await helperReadFile(PANT_PATH);
        res.json(pants);    
    } catch (error) {
        res.json(error.message)
    }
};

exports.getPantById = async (req, res) => {
    try {
        const pant = await helperGetById(PANT_PATH, parseInt(req.params.id));
        res.json(pant);    
    } catch (error) {
        res.json(error.message)
    }
};

exports.updatePant = async (req, res) => {
    try {
        const newPant = await helperWriteFile(PANT_PATH, req.params.id, req.body);
        res.json(newPant);    
    } catch (error) {
        res.json(error.message)
    }
}

// Controllers function Shirt

exports.getAllShirts = async (req, res) => {
    try {
        const shirts = await helperReadFile(SHIRT_PATH);
        res.json(shirts);    
    } catch (error) {
        res.json(error.message)
    }
};

exports.getShirtById = async (req, res) => {
    try {
        const shirt = await helperGetById(SHIRT_PATH, parseInt(req.params.id));
        res.json(shirt)    
    } catch (error) {
        res.json(error.message)
    }
};

exports.updateShirt = async (req, res) => {
    try {
        const newPant = await helperWriteFile(SHIRT_PATH, req.params.id, req.body);
        res.json(newPant);
    } catch (error) {
        res.json(error.message)
    }
}