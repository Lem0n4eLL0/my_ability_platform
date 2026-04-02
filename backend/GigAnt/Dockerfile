# ЭТАП 1: Сборка (Builder)
# Используем полный образ Maven только для компиляции
FROM maven:3.9-eclipse-temurin-21 AS builder

WORKDIR /app
COPY pom.xml .
# Копируем все модули
COPY Core-module ./Core-module
RUN ls -R /app/Core-module/src/main/java/com/example/core/exception/
COPY Authentication-module ./Authentication-module
COPY Notification-module ./Notification-module
COPY Test-module ./Test-module
COPY Verification-module ./Verification-module
COPY Objects-module ./Objects-module


RUN mvn clean package -DskipTests


FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Создаем пользователя для безопасности (хороший тон для диплома)
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Копируем ТОЛЬКО готовый JAR из этапа сборки
# ВАЖНО: Проверь имя файла в папке target главного модуля!
# Обычно оно имеет вид: artifactId-version.jar
COPY --from=builder /app/GigAnt/target/*.jar app.jar

# Переменные окружения для JVM (опционально, но круто для диплома)
ENV JAVA_TOOL_OPTIONS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0"

# Точка входа
ENTRYPOINT ["java", "-jar", "app.jar"]