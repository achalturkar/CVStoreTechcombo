## Use OpenJDK 17 as the base image
## === Build Stage ===
#FROM maven:3.8.5-openjdk-17 AS build
#WORKDIR /app
#COPY . .
#RUN mvn clean package -DskipTests
#
## === Run Stage ===
#FROM openjdk:17.0.1-jdk-slim
#WORKDIR /app
#
## Copy the built jar from the build stage
#COPY --from=build /app/target/*.jar app.jar
#
## Expose port
#EXPOSE 8080
#
## Run the app
#ENTRYPOINT ["java", "-jar", "app.jar","--spring.profiles.active=prod"]
#
## -------------------------------
# 🚀 BUILD STAGE (MAVEN + JDK)
# -------------------------------
# Use official Maven + JDK17 image to compile the Spring project
FROM maven:3.9.6-eclipse-temurin-17 AS build

# Set working directory inside container
WORKDIR /app

# Copy project files into container
COPY . .

# Build the project (skip tests for faster build)
RUN mvn clean package -DskipTests



# -------------------------------
# 🚀 RUN STAGE (LIGHTWEIGHT JDK)
# -------------------------------
# Use lightweight JDK image for production (smaller & faster)
FROM eclipse-temurin:17-jdk-jammy

# Create working directory
WORKDIR /app

# Copy the final jar from previous build stage
COPY --from=build /app/target/*.jar app.jar

# Expose backend port
EXPOSE 8080

# Enable production profile
# --spring.profiles.active=prod ensures prod DB config loads
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=prod"]



