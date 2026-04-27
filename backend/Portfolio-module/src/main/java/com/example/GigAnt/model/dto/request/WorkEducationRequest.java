package com.example.GigAnt.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record WorkEducationRequest(
    @NotBlank(message = "Город обязателен для заполнения")
    @Size(max = 100, message = "Город не должен превышать 100 символов")
    String city,

    @NotBlank(message = "Название компании обязательно для заполнения")
    @Size(max = 255, message = "Название компании не должно превышать 255 символов")
    String company,

    @NotBlank(message = "Год начала работы обязателен для заполнения")
    @Pattern(regexp = "^\\d{4}$", message = "Год начала должен быть в формате ГГГГ (например: 2020)")
    String yearStart,

    @Pattern(regexp = "^(\\d{4})?$", message = "Год окончания должен быть в формате ГГГГ (например: 2024)")
    String yearEnd,

    @NotBlank(message = "Должность обязательна для заполнения")
    @Size(max = 255, message = "Должность не должна превышать 255 символов")
    String post
) {

}