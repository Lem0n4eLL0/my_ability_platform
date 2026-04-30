package com.example.GigAnt.model.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record ProfileUpdateRequest(
    @Schema(description = "Имя пользователя", example = "Иван")
    @Size(min = 2, max = 50, message = "Имя должно быть от 2 до 50 символов")
    String firstName,

    @Schema(description = "Фамилия пользователя", example = "Иванов")
    @Size(min = 2, max = 50, message = "Фамилия должна быть от 2 до 50 символов")
    String secondName,

    @Schema(description = "Отчество пользователя (опционально)", example = "Иванович")
    String surnameName,

    @Schema(description = "Дата рождения в формате ГГГГ-ММ-ДД", example = "1990-01-01")
    @Past(message = "Дата рождения должна быть в прошлом")
    LocalDate birthDate,

    @Schema(description = "Информация о себе", example = "Разработчик с 5-летним опытом в Java")
    String aboutMe,

    @Schema(description = "Контактный телефон в формате +7...", example = "+79991234567")
    String contactPhone,

    @Schema(description = "Имя пользователя на GitHub", example = "evatero")
    String github,

    @Schema(description = "Email пользователя", example = "evatero@mail.ru")
    String email,

    @Schema(description = "Ссылка на аватар", example = "https://cdn.example.com/avatars/123.jpg")
    String avatarLink

) {


}
