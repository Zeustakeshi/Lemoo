FROM openjdk:17-jdk-slim
LABEL authors="Minhhieuano"
COPY target/*.jar app.jar
LABEL description="Order service v2"
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-jar", "/app.jar"]