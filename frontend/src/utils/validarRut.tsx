function validarRut(rut: string){
    // Verificar si el RUT tiene el formato adecuado
    if (!/^\d{1,8}-\d$/.test(rut)) return false;

    // Separar el dígito verificador del resto del RUT
    const rutSinDV = rut.slice(0, -2);
    const dv = rut.slice(-1).toLowerCase();

    // Calcular el dígito verificador esperado
    let suma = 0;
    let multiplo = 2;

    // Recorrer el RUT de derecha a izquierda para calcular la suma ponderada
    for (let i = rutSinDV.length - 1; i >= 0; i--) {
    suma += parseInt(rutSinDV.charAt(i)) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    // Calcular el dígito verificador esperado
    const dvEsperado = 11 - (suma % 11);

    // Verificar si el dígito verificador coincide
    return (dv === (dvEsperado === 10 ? 'k' : dvEsperado.toString()));
}

export default validarRut;