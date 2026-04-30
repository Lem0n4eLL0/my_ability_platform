package com.example.GigAnt.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ProjectsRequest(
    @NotBlank(message = "Название проекта обязательно для заполнения")
    @Size(min = 2, max = 255, message = "Название проекта должно быть от 2 до 255 символов")
    String title,

    @Size(max = 5000, message = "Описание не должно превышать 5000 символов")
    String description,

    @Size(max = 100, message = "Ссылка не должна превышать 100 символов")
    String link
) {

}