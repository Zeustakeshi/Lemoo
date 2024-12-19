FROM openjdk:17-jdk-alpine
LABEL authors="Minhhieuano"
LABEL description="User service v1"
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]