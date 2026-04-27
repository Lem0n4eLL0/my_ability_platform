package com.example.GigAnt.model.dto.request;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

@Schema(description = "Запрос на создание профиля пользователя")
public record ProfileCreateRequest(

    @Schema(description = "Имя пользователя", example = "Иван")
    @NotBlank(message = "Имя обязательно для заполнения")
    @Size(min = 2, max = 50, message = "Имя должно быть от 2 до 50 символов")
    String firstName,

    @Schema(description = "Фамилия пользователя", example = "Иванов")
    @NotBlank(message = "Фамилия обязательна для заполнения")
    @Size(min = 2, max = 50, message = "Фамилия должна быть от 2 до 50 символов")
    String lastName,

    @Schema(description = "Отчество пользователя (опционально)", example = "Иванович", required = false)
    String surname,

    @Schema(description = "Дата рождения в формате ГГГГ-ММ-ДД", example = "1990-01-01")
    @NotBlank(message = "Дата рождения обязательна для заполнения")
    @Past(message = "Дата рождения должна быть в прошлом")
    LocalDate birthday
) {

}