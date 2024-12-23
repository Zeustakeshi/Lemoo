FROM openjdk:17-jdk-alpine
LABEL authors="Minhhieuano"
COPY target/*.jar app.jar
LABEL description="Product service v1"
ENTRYPOINT ["java","-jar","/app.jar"]