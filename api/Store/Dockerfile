FROM openjdk:17-jdk-alpine
LABEL authors="Minhhieuano"
LABEL description="Store service"
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]