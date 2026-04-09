![Logo de Coopuertos](public/images/logo.svg)

[![Version](https://img.shields.io/badge/Version-0.3%20Beta-yellow?style=for-the-badge)](https://github.com/MangoMorado/coopuertos2/commits/main/)
[![PHP Version](https://img.shields.io/badge/PHP-8.2+-blue.svg?style=for-the-badge)](https://php.net)
[![Laravel](https://img.shields.io/badge/Laravel-13-red.svg?style=for-the-badge)](https://laravel.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2-blue.svg?style=for-the-badge)](https://tailwindcss.com)
[![Alpine.js](https://img.shields.io/badge/Alpine.js-3.15-green.svg?style=for-the-badge)](https://alpinejs.dev)

# Coopuertos - ERP

Sistema web desarrollado con Laravel 13 para la gestión integral de conductores, vehículos y propietarios de una cooperativa de transporte.

## 🚀 Características Principales

### Gestión de Conductores
- CRUD completo de conductores
- Generación de carnets con QR
- Fotos públicas de conductores
- Búsqueda en tiempo real
- Visualización pública mediante UUID

### Gestión de Vehículos
- CRUD completo de vehículos
- Asociación con conductores
- Búsqueda avanzada de vehículos
- Gestión de placas

### Gestión de Propietarios
- CRUD completo de propietarios
- Búsqueda de propietarios
- Asociación con vehículos

### Sistema de Carnets
- Diseñador visual de plantillas de carnets
- Personalización de carnets
- Generación masiva de carnets
- Descarga en formato ZIP
- Seguimiento de progreso de generación

### Interfaz de Usuario
- Tema claro/oscuro
- Sidebar de navegación
- Dashboard con métricas
- UI completamente en español
- Diseño responsive

### API REST
- API REST completa con 23 endpoints
- Autenticación con Laravel Sanctum (tokens Bearer)
- Documentación interactiva con Swagger/OpenAPI
- Colección Postman completa disponible
- Versionado de API (`/api/v1/`)
- Integración con permisos Spatie
- Rate limiting configurado
- Endpoints: autenticación, conductores, vehículos, propietarios, dashboard

## 📋 Requisitos

- PHP >= 8.2
- Composer
- Node.js y NPM
- Base de datos (MySQL, PostgreSQL, SQLite)
- Servidor web (Apache/Nginx) o PHP Built-in Server

## 🛠️ Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/MangoMorado/coopuertos2.git
cd coopuertos2
```

2. Instalar dependencias de PHP:
```bash
composer install
```

3. Instalar dependencias de Node.js:
```bash
npm install
```

4. Configurar el archivo de entorno:
```bash
cp .env.example .env
php artisan key:generate
```

5. Configurar la base de datos en `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=coopuertos
DB_USERNAME=root
DB_PASSWORD=
```

6. Ejecutar migraciones:
```bash
php artisan migrate
```

7. (Opcional) Poblar la base de datos con datos de prueba:
```bash
php artisan db:seed
```

8. Compilar assets:
```bash
npm run build
```

9. Iniciar el servidor de desarrollo:
```bash
php artisan serve
```

O usar el script de desarrollo que incluye servidor, cola de trabajos y logs:
```bash
composer run dev
```

## 📦 Tecnologías Utilizadas

- **Backend**: Laravel 13
- **Frontend**: Blade Templates, Tailwind CSS 4.x, Alpine.js
- **Generación de PDFs**: DomPDF
- **Generación de QR**: SimpleSoftwareIO/simple-qrcode
- **Autenticación**: Laravel Breeze
- **Roles y Permisos**: Spatie Laravel Permission
- **Base de datos**: MySQL/PostgreSQL/SQLite

## Patrón Arquitectónico
El proyecto sigue una **arquitectura orientada a servicios (SOA)** con separación clara de responsabilidades:

## Principios Aplicados
- **SOLID**: Servicios especializados por responsabilidad
- **DRY**: Reutilización de código mediante servicios
- **Separation of Concerns**: Controladores delgados, lógica en servicios
- **Queue-based Processing**: Jobs para operaciones pesadas

## 📁 Estructura del Proyecto

```
coopuertos2/
├── app/
│   ├── Http/Controllers/    # Controladores
│   ├── Models/              # Modelos Eloquent
│   ├── Jobs/                # Trabajos en cola
│   └── Console/Commands/    # Comandos Artisan
├── database/
│   ├── migrations/          # Migraciones de base de datos
│   └── seeders/             # Seeders
├── resources/
│   ├── views/               # Vistas Blade
│   └── js/                  # JavaScript
├── routes/
│   ├── web.php              # Rutas web
│   ├── api.php              # Rutas API REST
│   └── auth.php             # Rutas de autenticación
├── app/
│   ├── Http/
│   │   ├── Controllers/Api/ # Controladores API
│   │   └── Resources/Api/   # API Resources
│   └── Api/                 # Configuración OpenAPI
├── docs/
│   └── postman_collection.json  # Colección Postman
└── public/                  # Archivos públicos
```

## 🚦 Comandos Útiles

- **Desarrollo**: `composer run dev` - Inicia servidor, cola y logs
- **Tests**: `composer run test` - Ejecuta las pruebas
- **Setup completo**: `composer run setup` - Instalación completa
- **Cola de desarrollo**: `composer run dev:queue` - Inicia el worker de colas para desarrollo

## 🔄 Sistema de Colas y Supervisor

El sistema utiliza **Laravel Queue** para procesar trabajos en segundo plano, como la generación masiva de carnets y la importación de conductores.

### Configuración Automática en Producción

Durante el despliegue, el script `scripts/setup-supervisor.php` se ejecuta automáticamente para configurar Supervisor y mantener el worker de colas ejecutándose de forma persistente.

#### Requisitos

- Supervisor instalado en el servidor
- Permisos para escribir en `/etc/supervisor/conf.d/`

#### Para Contenedores (Buildpacks/Docker)

Si estás usando Railway Buildpacks, Nixpacks o Docker, asegúrate de instalar `supervisor` y las dependencias necesarias durante el build:

**Para Railway Buildpacks/Nixpacks:**
- Agrega los paquetes en la configuración de compilación (Paquetes APT o Aptfile según corresponda)

**Paquetes necesarios:**
```
supervisor imagemagick libmagickwand-dev php-imagick
```

El script detectará automáticamente que está en un contenedor y configurará supervisor para que se inicie cuando el contenedor arranque.

#### Instalación de Supervisor (Ubuntu/Debian)

```bash
sudo apt-get update
sudo apt-get install supervisor
sudo systemctl enable supervisor
sudo systemctl start supervisor
```

#### Configuración Automática

El script se ejecuta automáticamente durante `composer install` y:

1. Detecta automáticamente la ruta del proyecto, usuario y PHP
2. Crea el archivo de configuración en `/etc/supervisor/conf.d/laravel-worker.conf`
3. Intenta habilitar el servicio automáticamente
4. Muestra instrucciones si requiere intervención manual

#### Configuración Manual (si es necesario)

Si el script automático no puede configurar supervisor, ejecuta manualmente:

```bash
# Verificar que el archivo de configuración existe
sudo cat /etc/supervisor/conf.d/laravel-worker.conf

# Recargar configuración de supervisor
sudo supervisorctl reread
sudo supervisorctl update

# Iniciar el worker
sudo supervisorctl start laravel-worker:*
```

#### Comandos de Gestión del Worker

```bash
# Ver estado del worker
sudo supervisorctl status laravel-worker:*

# Ver logs en tiempo real
sudo supervisorctl tail -f laravel-worker:*

# Reiniciar el worker
sudo supervisorctl restart laravel-worker:*

# Detener el worker
sudo supervisorctl stop laravel-worker:*

# Ver logs del worker
tail -f storage/logs/worker.log
```

#### Configuración del Worker

El worker está configurado para:
- **Colas**: `importaciones`, `carnets` (en ese orden de prioridad)
- **Reintentos**: 3 intentos por trabajo fallido
- **Timeout**: 600 segundos (10 minutos) por trabajo
- **Max time**: 3600 segundos (1 hora) antes de reiniciar el proceso
- **Auto-reinicio**: Se reinicia automáticamente si falla

#### Desarrollo Local

Para desarrollo local, puedes ejecutar el worker manualmente:

```bash
php artisan queue:work --queue=importaciones,carnets --tries=3
```

O usar el script de composer:

```bash
composer run dev:queue
```

## 🔐 Sistema de Roles y Permisos

El sistema utiliza **Spatie Laravel Permission** para gestionar roles y permisos de manera granular.

### Roles Disponibles

- **Mango**: Rol SuperAdmin con acceso completo a todos los módulos y configuración
- **Admin**: Rol administrativo con acceso a todos los módulos excepto configuración
- **User**: Rol de usuario básico con acceso de solo lectura

#### Asignar Rol Mango a un Usuario

Para asignar el rol Mango a un usuario, utiliza el comando Artisan:

```bash
php artisan new-mango correo@correo.com
```

Este comando busca al usuario por email y le asigna el rol Mango si no lo tiene. También puedes asignar roles desde la interfaz web editando un usuario (si tienes permisos) o mediante Tinker:

```php
php artisan tinker
$user = App\Models\User::where('email', 'usuario@ejemplo.com')->first();
$user->assignRole('Mango');
```

### Módulos y Permisos

Cada módulo tiene 4 permisos base que controlan las acciones:

- `ver {modulo}`: Ver/Listar elementos del módulo
- `crear {modulo}`: Crear nuevos elementos
- `editar {modulo}`: Editar elementos existentes
- `eliminar {modulo}`: Eliminar elementos

#### Módulos Disponibles

1. **Dashboard** (`dashboard`)
   - Ver panel de control y estadísticas

2. **Conductores** (`conductores`)
   - Ver, crear, editar y eliminar conductores
   - Generar carnets
   - Ver información detallada

3. **Vehículos** (`vehiculos`)
   - Ver, crear, editar y eliminar vehículos
   - Asociar con conductores

4. **Propietarios** (`propietarios`)
   - Ver, crear, editar y eliminar propietarios

5. **Carnets** (`carnets`)
   - Ver, crear, editar y eliminar carnets
   - Personalizar plantillas
   - Generar carnets masivos

6. **Configuración** (`configuracion`) - Solo para rol Mango
   - Gestionar permisos por módulo y rol
   - Configurar acceso de usuarios

### Configuración de Permisos

- Los módulos aparecen automáticamente en el navbar según los permisos del usuario
- El rol Mango tiene acceso completo y no puede ser modificado
- Los permisos se pueden gestionar desde la vista de Configuración (solo Mango)
- Los permisos se aplican tanto en rutas como en vistas mediante directivas `@can` y middleware

##  Notas de Versión

Para ver el historial completo de cambios y mejoras, consulta el archivo [changenotes.md](changenotes.md).

## 🛣️ Roadmap

Para ver el progreso de la App y su bitacora de cambios, consulta el archivo [roadmap.md](roadmap.md).

## 📄 Licencia

Este proyecto es software propietario. Todos los derechos reservados.

