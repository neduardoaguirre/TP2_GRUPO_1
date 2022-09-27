# Requisitos

### 1) Instalar:
- NodeJS: v16+
- NPM: v8+

### 2) Instalar dependencias:

> npm i

### 3) Ejecutar proyecto:

> npm run start

### 4) Ejecutar test's cases:

> npm run _nombre_del_test_

Test's disponibles:

- test-admin
- test-auto
- test-cliente
- test-direccion
- test-respuesta

Ejemplo:
> npm run test-auto

Correr todos los tests disponibles:
- npm run test

# Trabajo Integrador TP2 - Grupo 1

## Objetivo

### El proyecto consistirá en una aplicación web orientada a la venta de autos. El principal objetivo es que la empresa que administre la aplicación publique autos de manera diaria incorporando toda la informacion del vehiculo. Los clientes poseerán usuarios a través de los cuales tendrán la posibilidad de buscar autos por modelo, año, marca, precio. También podrán señar el el auto para luego proceder con la compra del mismo en el local. Además, una vez iniciada sesión los usuarios podrán realizar consultas en la publicación (comentarios) los cuales serán respondidos por la empresa (usuarios administrativos).

## Entidades

###
- Auto
- Cliente
- Admin
- Comentario
- Direccion
- Publicacion
- Respuesta

**Auto**
```
- precio
- marca
- modelo
- anio
- color
- img
- cantPuertas
- tipoCombustible
```

**Cliente**
```
- mail
- pass
- nombre
- apellido
- dni
- historial
- favoritos
- autosSeniados
```

**Admin**
```
- mail
- password
```

**Comentario**
```
- fecha
- texto
- respuesta
```

**Direccion**
```
- altura
- calle
- numDepto
- provincia
- localidad
- zipCode
```

**Publicacion**
```
- auto
- fecha
- seniado
- comentarios
```

**Respuesta**
```
- fecha
- texto
```
