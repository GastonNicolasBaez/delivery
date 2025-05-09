// Es importante usar tu dirección IP local en lugar de localhost 
// para que funcione en el emulador y dispositivos físicos
const API_BASE_URL = 'http://10.110.10.130:5000/api';

export const endpoints = {
  empanadas: `${API_BASE_URL}/empanadas`,
  pedidos: `${API_BASE_URL}/pedidos`,
  admin: {
    login: `${API_BASE_URL}/admin/login`
  }
};

// Nota: Deberás cambiar la IP por la de tu máquina al ejecutar la aplicación
// En Windows puedes obtenerla con el comando: ipconfig
// En Mac/Linux: ifconfig 