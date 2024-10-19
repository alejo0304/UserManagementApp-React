import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setError, clearUser } from './Reducers/reducer'; 
import iAX from './API/api'; 
const UserForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { user, error } = useSelector((state) => state.user);

    const handleAutoComplete = () => {
        setEmail('eve.holt@reqres.in');
        setPassword('cityslicka');
    };

    const handleCreateUser = async () => {
        dispatch(clearUser()); 
        try {
            const loginResponse = await iAX.post('/login', {
                email,
                password,
            });

            const token = loginResponse.data.token; 

            const userResponse = await iAX.post('/users', {
                name: 'morpheus', 
                job: 'leader', 
            });

            const createdUserId = userResponse.data.id;

            const userDetailsResponse = await iAX.get(`/users/4`);
            dispatch(setUser(userDetailsResponse.data.data));

        } catch (error) {
            if (error.response) {
                dispatch(setError(`Error: ${error.response.data ? error.response.data : error.message}`));
            } else if (error.request) {
                dispatch(setError('Error: No se recibió respuesta del servidor'));
            } else {
                dispatch(setError(`Error: ${error.message}`));
            }
            console.error('Error al crear el usuario:', error);
        }
    };

    return (
        <div>
            <h2>Crear Usuario</h2>

        
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

           
            <button onClick={handleAutoComplete}>Autocompletar Email y Contraseña</button>

            <button onClick={handleCreateUser}>Crear Usuario</button>

            {error && <p>{error}</p>}

            {user && (
                <div>
                    <h3>Datos del Usuario Creado:</h3>
                    <p>ID: {user.id}</p>
                    <p>Email: {user.email}</p>
                    <p>Nombre: {user.first_name}</p>
                    <p>Apellido: {user.last_name}</p>
                    <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
                </div>
            )}
        </div>
    );
};

export default UserForm;