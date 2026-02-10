import fs from 'fs/promises';

interface HasId {
    id: number;
}

const HelperService = {

    async helperReadFile<T extends HasId>(path: string): Promise<T[]> {
        const response = await fs.readFile(path, {encoding: 'utf-8'});
        if (!response) throw new Error(`No tiene contenido`);
        return JSON.parse(response)
    },
    async helperGetById<T extends HasId>(path: string, id: number): Promise<T> {
        const array = await this.helperReadFile<T>(path);
        const element = array.find(array => array.id = id);
        if (!element) throw new Error(`No se encontro el objeto con id ${id}`);
        return element;
    },    
    async helperWriteFile<T>(path: string, idToUpdate: number, newData: T) {
        const array = await this.helperReadFile(path);
        const index = array.findIndex(item => item.id == idToUpdate);
        if (index == -1) throw new Error(`No se encontro el objeto con id ${idToUpdate}`);
        array[index] = { ...array[index], ...newData }
        await fs.writeFile(path, JSON.stringify(array, null, 2))
        return { ...array[index], ...newData }  
    }

};

export default HelperService;