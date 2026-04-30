package com.example.GigAnt.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CertificateRequest(
    @NotBlank(message = "Заголовок не может быть пустым")
    @Size(min = 5, max = 100, message = "Введите заголовок от 5 до 100 символов")
    String title,
    @NotBlank(message = "Ссылка на сертификат не может быть пустой")
    @Size(min = 5)
    String link
) {


}
