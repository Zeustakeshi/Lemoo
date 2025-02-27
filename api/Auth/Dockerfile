FROM openjdk:17-jdk-slim
LABEL authors="Minhhieuano"
LABEL description="Auth service v1"
COPY target/*.jar app.jar
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:+UnlockExperimentalVMOptions", "-XX:+UseCGroupMemoryLimitForHeap", "-jar", "/app.jar"]
