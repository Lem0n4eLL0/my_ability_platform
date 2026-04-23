# ==========================================
# ЭТАП 1: Сборка (Builder)
# ==========================================
# Используем BuildKit-кэш для Maven-репозитория и JDK 21
FROM maven:3.9.9-eclipse-temurin-21 AS builder
WORKDIR /app

# 1. Копируем POM-файлы ДО исходного кода.
#    Это позволяет Docker кэшировать этап разрешения зависимостей.
COPY pom.xml .
COPY Core-module/pom.xml Core-module/pom.xml
COPY Authentication-module/pom.xml Authentication-module/pom.xml
COPY Notification-module/pom.xml Notification-module/pom.xml
COPY Test-module/pom.xml Test-module/pom.xml
COPY Verification-module/pom.xml Verification-module/pom.xml
COPY Objects-module/pom.xml Objects-module/pom.xml
COPY Application-module/pom.xml Application-module/pom.xml
COPY Portfolio-module/pom.xml Portfolio-module/pom.xml

# 2. Предзагрузка зависимостей с кэшированием (требует DOCKER_BUILDKIT=1)
RUN --mount=type=cache,target=/root/.m2 mvn dependency:go-offline -B

# 3. Копируем исходный код модулей
COPY Core-module ./Core-module
COPY Authentication-module ./Authentication-module
COPY Notification-module ./Notification-module
COPY Test-module ./Test-module
COPY Verification-module ./Verification-module
COPY Objects-module ./Objects-module
COPY Application-module ./Application-module
COPY Portfolio-module ./Portfolio-module

# 4. Компиляция и упаковка целевого модуля.
#    -pl Application-module -am: собирает только главный модуль + его зависимости
#    -DskipTests: пропускает тесты (в CI/CD рекомендуется -DskipTests, а не .skip)
RUN --mount=type=cache,target=/root/.m2 mvn clean package -pl Application-module -am -DskipTests

# ==========================================
# ЭТАП 2: Разделение на слои (Layered JAR)
# ==========================================
FROM eclipse-temurin:21-jre-alpine AS layers
WORKDIR /app

# Используем wildcard, чтобы не привязываться к версии в имени файла
COPY --from=builder /app/Application-module/target/*.jar app.jar

# Встроенная утилита Spring Boot распаковывает JAR на 4 логических слоя
RUN java -Djarmode=layertools -jar app.jar extract --destination extracted

# ==========================================
# ЭТАП 3: Запуск (Runtime)
# ==========================================
FROM eclipse-temurin:21-jre-alpine AS runner
WORKDIR /app

# Создаём непривилегированного пользователя (Security Best Practice)
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Копируем слои в порядке от стабильных к изменяемым.
# При изменении только бизнес-логики Docker переиспользует кэш первых трёх слоёв.
COPY --from=layers /app/extracted/dependencies/ ./
COPY --from=layers /app/extracted/spring-boot-loader/ ./
COPY --from=layers /app/extracted/snapshot-dependencies/ ./
COPY --from=layers /app/extracted/application/ ./

# Копируем оригинальный JAR (нужен для корректной работы загрузчика)
COPY --from=layers /app/app.jar ./

# Генерация CDS-архива (Class Data Sharing) для ускорения старта JVM на 20-40%
# -Dspring.context.exit=onRefresh завершает процесс сразу после инициализации контекста
RUN java -XX:ArchiveClassesAtExit=app.jsa -Dspring.context.exit=onRefresh -jar app.jar || true

# Переменные окружения JVM (автоматически подхватываются java-лаунчером)
ENV JAVA_TOOL_OPTIONS="\
    -XX:+UseContainerSupport \
    -XX:MaxRAMPercentage=75.0 \
    -XX:SharedArchiveFile=app.jsa \
    -XX:+HeapDumpOnOutOfMemoryError \
    -XX:HeapDumpPath=/tmp/heapdump.hprof \
    -XX:ErrorFile=/tmp/hs_err_pid%p.log \
    -XX:+ExitOnOutOfMemoryError \
    -XX:NativeMemoryTracking=summary \
    -Djava.security.egd=file:/dev/./urandom"

# Проверка работоспособности для оркестраторов (требует spring-boot-starter-actuator)
HEALTHCHECK --interval=30s --timeout=10s --start-period=45s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/actuator/health || exit 1

# Точка входа
ENTRYPOINT ["java", "-jar", "app.jar"]