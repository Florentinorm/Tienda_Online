const conexion = require("./conexion")
module.exports = {
  obtenerProductosVendidos(idVenta) {
    return new Promise((resolve, reject) => {
      conexion.query(`select productos.* from productos_vendidos inner join productos on productos.id = productos_vendidos.id_producto where productos_vendidos.id_venta = ?;`,
        [idVenta],
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados);
        });
    });
  },
  obtenerPorId(id) {
    return new Promise((resolve, reject) => {
      conexion.query(`select ventas.total, usuarios.nombre, usuarios.direccion FROM ventas inner join usuarios on ventas.id_usuario = usuarios.id_usuario WHERE ventas.id = ?`,
        [id],
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados[0]);
        });
    });
  },
  obtener() {
    return new Promise((resolve, reject) => {
      conexion.query(`select ventas.id, ventas.total, usuarios.nombre, usuarios.direccion FROM ventas inner join usuarios on ventas.id_usuario = usuarios.id_usuario;`,
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados);
        });
    });
  },
  insertar(idCliente, total) {
    return new Promise((resolve, reject) => {
      conexion.query(`insert into ventas
            (id_usuario, total)
            values
            (?, ?)`,
        [idCliente, total], (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados.insertId);
        });
    });
  },
}