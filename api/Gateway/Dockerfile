FROM openjdk:17-jdk-alpine
LABEL authors="Minhhieuano"
LABEL description="Gateway service v1"
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]