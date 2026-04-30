package com.example.GigAnt.model.dto.request;

import com.example.GigAnt.model.enums.EducationStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record EducationRequest(
    @NotBlank(message = "Город обязателен для заполнения")
    @Size(max = 255, message = "Город не должен превышать 255 символов")
    String city,

    @NotBlank(message = "Университет обязателен для заполнения")
    @Size(max = 255, message = "Университет не должен превышать 255 символов")
    String university,

    @NotBlank(message = "Факультет обязателен для заполнения")
    @Size(max = 255, message = "Факультет не должен превышать 255 символов")
    String faculty,

    @NotBlank(message = "Специализация обязательна для заполнения")
    @Size(max = 255, message = "Специализация не должна превышать 255 символов")
    String specialization,

    @NotNull(message = "Статус обязателен для заполнения")
    EducationStatus status,
    LocalDate graduationDate
) {

}