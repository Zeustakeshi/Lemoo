FROM openjdk:17-jdk-slim
LABEL authors="Minhhieuano"
LABEL description="Chat ai mcp server v1"
COPY target/*.jar app.jar
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-jar", "/app.jar"]