package com.example.GigAnt.model.dto.external;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.Map;
import java.util.UUID;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record Option(
        UUID id,
        String text,
        String codeBase,
        Map<String,Object> additionalData
) {
}
