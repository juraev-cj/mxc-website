FROM ubuntu:jammy
RUN apt-get update && apt-get install -y openjdk-17-jdk
WORKDIR /app
COPY . .
RUN chmod +x mvnw && ./mvnw clean package -DskipTests
EXPOSE 8080
CMD [ "java", "-jar", "target/*.jar" ]