const axios = require("axios");

const endpoints = {
  getReporteProducto: () => {
    const cancelSource = axios.CancelToken.source();

    return {
      url: "Reporte/producto-excel",
      method: "get",
      headers: {
        "Content-Type": "application/json; charset=utf8",
      },
      cancelToken: cancelSource.token,
      responseType: "stream",
    };
  },

  getReporteStock: () => {
    const cancelSource = axios.CancelToken.source();

    return {
      url: `Reporte/Stock-bajo-excel`,
      method: "get",
      headers: {
        "Content-Type": "application/json; charset=utf8",
      },
      cancelToken: cancelSource.token,
      responseType: "stream",
    };
  },

  getReporteBajoProducto: () => {
    const cancelSource = axios.CancelToken.source();

    return {
      url: `Reporte/Reporte-bajo-excel`,
      method: "get",
      headers: {
        "Content-Type": "application/json; charset=utf8",
      },
      cancelToken: cancelSource.token,
      responseType: "stream",
    };
  },

  getProductos: (param) => {
    const cancelSource = axios.CancelToken.source();

    return {
      url: `Reporte/consultaproducto/${param}`,
      method: "get",
      headers: {
        "Content-Type": "application/json; charset=utf8",
      },
      cancelToken: cancelSource.token
    };
  },

  getUsers: () => {
    const cancelSource = axios.CancelToken.source();

    return {
      url: `Usuario`,
      method: "get",
      headers: {
        "Content-Type": "application/json; charset=utf8",
      },
      cancelToken: cancelSource.token
    };
  },
};

module.exports = { endpoints };
