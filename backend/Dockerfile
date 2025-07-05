FROM maven:3.9-eclipse-temurin-17

WORKDIR /app

# Copia apenas o POM e resolve dependências para cache
COPY pom.xml .
COPY .mvn .mvn
RUN mvn dependency:go-offline

# O código-fonte será montado como volume no container
CMD ["mvn", "spring-boot:run"]
