const { endpoints } = require('./endpoints');
const { HttpClient } = require('../util/http-client');
const fs = require('fs');
const path = require('path');

class InventarioApi {
  static async obtenerReporteProducto() {
    const outputFilePath = path.resolve(__dirname, 'reporte-producto.xlsx');
    const writer = fs.createWriteStream(outputFilePath);

    const { getReporteProducto } = endpoints;

    await HttpClient.request(getReporteProducto())
        .then(({ data }) => {
          data.pipe(writer); 
        })
        .catch((error) => {
          console.log(error);
        });

    return outputFilePath;
  }

  static async obtenerReporteStock() {
    const outputFilePath = path.resolve(__dirname, 'reporte-stock.xlsx');
    const writer = fs.createWriteStream(outputFilePath);

    const { getReporteStock } = endpoints;

    await HttpClient.request(getReporteStock())
        .then(({ data }) => {
          data.pipe(writer); 
        })
        .catch((error) => {
          console.log(error);
        });

    return outputFilePath;
  }

  static async obtenerUsuarios() {
    const { getUsers } = endpoints;

    const response = await HttpClient.request(getUsers());

    return response?.data || [];
  }
}

module.exports = { InventarioApi }