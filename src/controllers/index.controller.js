const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'postgres',
    database: 'apirest',
    port: '5432'
});

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM usuarios ORDER BY id ASC');
    res.status(200).json(response.rows);
};

const getUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    res.json(response.rows);
};

const createUser = async (req, res) => {
    const { cedula_identidad,nombre,primer_apellido,segundo_apellido,fecha_nacimiento } = req.body;
    const response = await pool.query('INSERT INTO usuarios (cedula_identidad, nombre, primer_apellido, segundo_apellido, fecha_nacimiento) VALUES ($1, $2, $3, $4, $5)', [cedula_identidad, nombre, primer_apellido, segundo_apellido, fecha_nacimiento]);
    res.json({
        message: 'Usuario registrado correctamente ',
        body: {
            usuarios: {cedula_identidad,nombre,primer_apellido, segundo_apellido, fecha_nacimiento}
        }
    })
};

const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { cedula_identidad,nombre,primer_apellido, segundo_apellido, fecha_nacimiento } = req.body;

    const response =await pool.query('UPDATE usuarios SET cedula_identidad = $1, nombre = $2, primer_apellido=$3, segundo_apellido=$4, fecha_nacimiento=$5 WHERE id = $6', [
        cedula_identidad,
        nombre,
        primer_apellido,
        segundo_apellido,
        fecha_nacimiento,
        id
    ]);
    res.json('Usuario actualizado correctamente');
};

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM usuarios where id = $1', [
        id
    ]);
    res.json('Usuario ${id} eliminado correctamente');
};

const getPromedio = async (req, res) => {
    const response = await pool.query('SELECT AVG(EXTRACT(YEAR FROM AGE(NOW(),fecha_nacimiento))) AS promedio_edades FROM usuarios');
    res.status(200).json(response.rows);
};


const getEstado = async (req, res) => {
    const response='{\'nameSystem\':\'APIREST MOD3,\' version\':\'0.01,\' developer\':\'Marianela Gonzales Zenteno,\'  email\':\'nelitagonz\'}'
    res.status(200).json(response);
};


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getPromedio,
    getEstado
};