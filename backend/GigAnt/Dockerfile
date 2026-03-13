# ЭТАП 1: Сборка (Builder)
# Используем полный образ Maven только для компиляции
FROM maven:3.9-eclipse-temurin-21 AS builder

WORKDIR /app
COPY pom.xml .
# Копируем все модули
COPY Authentication-module ./Authentication-module
COPY Core-module ./Core-module
COPY Notification-module ./Notification-module
COPY Test-module ./Test-module
COPY Verification-module ./Verification-module

COPY GigAnt ./GigAnt

# Собираем проект.
# Флаг -DskipTests ускоряет сборку образа (тесты лучше гонять в CI отдельно)
RUN mvn clean package -DskipTests

# ЭТАП 2: Запуск (Runtime)
# Берем легковесный образ только с Java (JRE), без Maven и компиляторов
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