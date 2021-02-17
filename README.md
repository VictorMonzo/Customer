# App Customer

## Descripción del proyecto
Esta es la aplicación final para el cliente donde podrá logearse y registrarse, hacer pedidos de nuestros porductos y hacer el seguimiento de estos. Tabmbién puede modificar su perfil y ver una página sobre la empresa (About).

## Instalación del proyecto y despliegue
1. Git clone del repositorio
2. Crear una rama, programar en ella y en terminar subirla
3. Ejecutar comando sh customer.sh

## Ip de la máquina y políticas de seguridad aplicadas (Puertos abiertos)
###### IP pública 
34.207.156.33

###### Puertos de seguridad
![Puertos de seguridad](/imgs/puertosSeguridad.png)

## Servicios y versiones instaladas
###### Servicio Nginx
![Versión Nginx](/imgs/versionNginx.png)

###### Servicio ssh
![Versión SSH](/imgs/versionSSH.png)

## Usuarios creados y privilegios asignados
Hemos creado el usuario *customer* con los siguiente privilegios:

Carpeta   | Privilegios 
--------- | ----------- 
/var/www/customer/html  | 755

A parte de este usuario tabmién se ha creado automaticamente el usuario *ubuntu* tiene aceso a todas las carpetas de la instancia como root.

## URL de la página web desplegada
www.g06.batoilogic.es

## Desplegamiento de la web
![Despliegue web](/imgs/despliegueWeb.png)
