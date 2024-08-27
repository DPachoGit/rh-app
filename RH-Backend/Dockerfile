# Usar la imagen de Maven con OpenJDK 21 para compilar el proyecto
FROM maven:3.9.8-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Usar la imagen de OpenJDK 21 para ejecutar la aplicación
FROM openjdk:21
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
