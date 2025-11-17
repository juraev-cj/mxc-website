# Используем надежный базовый образ OpenJDK 17 от Eclipse Temurin
FROM eclipse-temurin:17-jdk-jammy

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем файлы проекта в контейнер
COPY . .

# Делаем скрипт Maven Wrapper исполняемым и собираем проект
# -DskipTests пропускает тесты для более быстрой сборки
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# Указываем порт, который слушает ваше приложение Spring Boot (обычно 8080)
EXPOSE 8080

# Указываем точное имя JAR-файла (проверьте ваш pom.xml на artifactId и версию)
ENV JAR_FILE=target/mxc-0.0.1-SNAPSHOT.jar

# Команда запуска приложения после сборки
CMD ["java", "-jar", "target/*.jar"]
