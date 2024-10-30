type Rates = {
    [key: string]: number;
  };
  
  function calcularArbitraje(rates: Rates, cantidadUSD: number) {
    // Función para obtener el fee del nombre del par
    function obtenerFee(pair: string): number {
      const feeStr = pair.split('-')[1];
      return parseFloat(feeStr);
    }
  
    // Encontrar la mejor opción para comprar después de fees
    let mejorCompra = Object.keys(rates).reduce((a, b) => (rates[a] * (1 + obtenerFee(a)) < rates[b] * (1 + obtenerFee(b)) ? a : b));
    let precioCompra = rates[mejorCompra] * (1 + obtenerFee(mejorCompra));
    let cantidadBTCBComprada = (cantidadUSD - obtenerFee(mejorCompra)) / precioCompra;
  
    // Encontrar la mejor opción para vender después de fees
    let mejorVenta = Object.keys(rates).reduce((a, b) => (rates[a] * (1 - obtenerFee(a)) > rates[b] * (1 - obtenerFee(b)) ? a : b));
    let precioVenta = rates[mejorVenta] * (obtenerFee(mejorVenta) / 100);
    let cantidadUSDObtenida = cantidadBTCBComprada * precioVenta - obtenerFee(mejorVenta);
  
    // Calcular ganancia final
    let gananciaFinal = cantidadUSDObtenida - cantidadUSD;
  
    return {
      mejorCompra,
      mejorVenta,
      gananciaFinal,
    };
  }
  
  // Ejemplo de uso
  const rates = {
    "USDT/BTCB-0.01_pancake": 66599.804681051,
    "USDT/BTCB-0.05_uniswap": 66592.99583126443,
    "USDT/BTCB-0.01_uniswap": 66571.92389788177,
  };
  
  const cantidadUSD = 400;
  const resultado = calcularArbitraje(rates, cantidadUSD);
  
  console.log(`Mejor opción para comprar: ${resultado.mejorCompra}`);
  console.log(`Mejor opción para vender: ${resultado.mejorVenta}`);
  console.log(`Ganancia final después de fees: ${resultado.gananciaFinal.toFixed(8)}`);
  