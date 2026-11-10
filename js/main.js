// main.js — Práctica 4
//
// Este script espera encontrar un archivo "inventario.json" (que tú vas a
// crear a partir del inventario.xml ya corregido) con esta forma:
//
// [
//   { "id": 1, "nombre": "Espresso", "categoria": "Bebidas", "precio": 35, "stock": 12 },
//   ...
// ]
//
// Mientras no exista inventario.json, vas a ver un error de "404" en la
// consola y en la pestaña Network — es normal, créalo tú.

const STOCK_BAJO = 5;

fetch('inventario.json')
  .then((r) => {
    if (!r.ok) throw new Error('No se encontró inventario.json (código ' + r.status + ')');
    return r.json();
  })
  .then((productos) => {
    const tbody = document.querySelector('#tabla-inventario tbody');
    tbody.innerHTML = '';
    productos.forEach((p) => {
      const tr = document.createElement('tr');
      if (p.stock < STOCK_BAJO) tr.classList.add('stock-bajo');
      tr.innerHTML = `
        <td>${p.nombre}</td>
        <td>${p.categoria}</td>
        <td>$${p.precio}</td>
        <td>${p.stock}</td>
      `;
      tbody.appendChild(tr);
    });
    document.getElementById('mensaje').textContent = `${productos.length} productos en inventario`;
  })
  .catch((err) => {
    document.getElementById('mensaje').textContent = 'Error: ' + err.message;
  });
