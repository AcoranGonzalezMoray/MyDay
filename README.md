<h1 align="center"> MyDay </h1>
<p align="center"> 
<img src="https://img.shields.io/badge/Plataforma-IOS%2FAndroid-green"/> <img src="https://img.shields.io/badge/framework-react%20native-blue"/> 
<img src="https://img.shields.io/badge/React%20Native-0.69-green"/> 

<img src="https://img.shields.io/badge/Versi%C3%B3n-1.3-red"/> 
<img src="https://img.shields.io/badge/language-typescript%20%7C%20swift%20%7C%20java-lightblue"/>

</p>
<p>MyDay es una app  para compartir notas con otras personas, integra un sisema de autenticación y un sistema de likes además permite el filtrado por categorias./p>


## Contenido
<div>

  <h3>1.App</h3>
  <h3>3.Funciones</h3>
  <h3>4.Instalación</h3>
  <h3>5.Notas</h3>
 
</div>

## App
  ### Interfaz Autenticacion
  <p align="center">
    <img height="500" src="https://github.com/AcoranGonzalezMoray/MyDay/blob/main/gif/20221206_154423.gif"/> 
    <img height="500" src="https://github.com/AcoranGonzalezMoray/MyDay/blob/main/gif/20221206_154438.gif"/> 
  </p>

  ### Modo Claro|Oscuro
  <p align="center">
    <img height="500" src="https://github.com/AcoranGonzalezMoray/MyDay/blob/main/gif/20221206_160935.gif"/> 
    <img height="500" src="https://github.com/AcoranGonzalezMoray/MyDay/blob/main/gif/20221206_161022.gif"/> 
  </p>



## Funciones
  <li>Compartir notas con otras personas</li>
  <li>Filtrado de texto por categoria</li>
  <li>Sistema de likes/autenticación integrados</li>

## Instalación

### Pasos:

  #### Clonar Repositorio
  ```
  git clone https://github.com/AcoranGonzalezMoray/MyDay.git
  ```

  #### Instalar dependencias del proyecto
  ```
  npm install (--legacy-peer-deps solo si npm ERR!)
  ```
 

 #### Ejecutar Aplicación
   ##### Android:
   ```
   npx react-native run-android
   ```
   ##### Ios:
   ```
   npx react-native run-ios
   ```
### Notas
<li>Recomiendo encarecidamente compilar y ejecutar este proyecto con Java JDK 11, para evitar incompatibilidades con los distintos paquetes instalados con npm</li>
<li>En futuros proyectos si al ejecutar en debug encuentras BUG! exception in phase 'semantic analysis' entonces:</li>
El problema es que usa una version Java x y Gradle x.x Pero Gradle x.x no es compatible con Java x. 

Necesitaba actualizar el graddle. Simplemente se cambia gradle/wrapper/gradle-wrapper.propertiesen esta línea (encontrando el gradel compatible):
 ```
distributionUrl=https\://services.gradle.org/distributions/gradle-7.0-bin.zip
 ```

