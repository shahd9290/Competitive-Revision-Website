FROM openjdk:21-jdk-slim

WORKDIR /app

# Copy build artifacts (make sure you run ./gradlew build first)
COPY build/libs/*.jar app.jar

# Copy resources (jwt keys + properties)
COPY src/main/resources src/main/resources

# Generate JWT keys if missing
RUN mkdir -p src/main/resources/jwt && \
    [ ! -f src/main/resources/jwt/app.key ] && \
    openssl genpkey -algorithm RSA -out src/main/resources/jwt/app.key -outform PEM && \
    openssl rsa -pubout -in src/main/resources/jwt/app.key -out src/main/resources/jwt/app.pub || true

# Rename properties file if needed
RUN if [ -f src/main/resources/application.properties.example ]; then \
      cp src/main/resources/application.properties.example src/main/resources/application.properties; \
    fi

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
