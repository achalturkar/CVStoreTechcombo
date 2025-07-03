# Use OpenJDK 17 as the base image
FROM openjdk:17-jdk-slim

# Create working directory inside container
WORKDIR /app

# Copy the generated JAR file
COPY target/*.jar app.jar

# Expose port (optional, for local docker testing)
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
