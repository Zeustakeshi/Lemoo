FROM openjdk:17-jdk-slim
LABEL authors="Minhhieuano"
LABEL description="Socket service v1"
COPY target/*.jar app.jar
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-jar", "/app.jar"]