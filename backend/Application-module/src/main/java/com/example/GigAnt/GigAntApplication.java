package com.example.GigAnt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;


// 1. Сканируем компоненты (Controllers, Services, Configs)
@ComponentScan(basePackages = {
    "com.example.GigAnt",
    "com.example.GigAnt.authentication",
    "com.example.GigAnt.authentication.mapper",

})
//// 2. Ищем JPA-сущности в других модулях
//@EntityScan(basePackages = {
//    "com.example.core.model",
//    "com.example.verification.entity",
//    "com.example.GigAnt.entity"
//    // добавьте пакеты с @Entity из ваших модулей
//})
//// 3. Ищем репозитории в других модулях
//@EnableJpaRepositories(basePackages = {
//    "com.example.core.repository",
//    "com.example.verification.repository",
//    "com.example.GigAnt.repository"
//    // добавьте пакеты с interface ... extends JpaRepository
//})
//@EnableAutoConfiguration
//@EnableWebMvc
@Configuration

@SpringBootApplication
public class GigAntApplication {

  public static void main(String[] args) {
    SpringApplication.run(GigAntApplication.class, args);
  }

}
