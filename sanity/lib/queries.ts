import { defineQuery } from 'next-sanity'

export const productosQuery = defineQuery(`
  *[_type == "producto"] | order(coalesce(orden, 9999) asc, _createdAt asc) {
    "id": _id, nombre, descripcion, precio, categoria, etiqueta, foto
  }
`)

export const ajustesQuery = defineQuery(`
  *[_type == "ajustes" && _id == "ajustes"][0] {
    nombre, eslogan, telefono, ubicacion, entregas, horario, logo, icono
  }
`)

export const portadaQuery = defineQuery(`
  *[_type == "portada" && _id == "portada"][0] { fotoPostres, fotoRopa }
`)
