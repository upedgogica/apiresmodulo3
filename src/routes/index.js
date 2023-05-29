const { Router } = require('express');
const router = Router();
const { getUsers, getUserById, createUser, updateUser, deleteUser, getPromedio, getEstado } = require('../controllers/index.controller');

router.get('/usuarios', getUsers);
router.get('/usuarios/:id', getUserById);
router.post('/usuarios', createUser);
router.put('/usuarios/:id', updateUser);
router.delete('/usuarios/:id', deleteUser);
router.get('/usuarios/promedio-edad', getPromedio);
router.get('/estado', getEstado);


module.exports = router;