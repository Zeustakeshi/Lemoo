# Sử dụng một image Java chính thức
FROM openjdk:17-jdk-slim

# Đặt biến môi trường
ENV APP_HOME=/app

# Tạo thư mục ứng dụng
WORKDIR $APP_HOME

# Sao chép tệp jar đã build vào container
COPY target/myapp.jar app.jar

# Expose port 8080
EXPOSE 8080

# Chạy ứng dụng
ENTRYPOINT ["java", "-jar", "app.jar"]
