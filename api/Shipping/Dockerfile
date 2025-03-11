FROM openjdk:17-jdk-slim
LABEL authors="Minhhieuano"
COPY target/*.jar app.jar
LABEL description="Product service v1"
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-jar", "/app.jar"]