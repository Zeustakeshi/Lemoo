FROM openjdk:17-jdk-alpine
LABEL authors="Minhhieuano"
LABEL description="Video service v1"
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]