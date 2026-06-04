package com.example.GigAnt.model.dto.external;

import com.example.GigAnt.model.enums.TestAttemptStatus;

import java.time.LocalDateTime;
import java.util.UUID;

public record TestAttemptsDto(
        UUID testId,
        UUID profileId,
        TestAttemptStatus status,
        int score,
        int maxScore,
        int estimationProcent,
        LocalDateTime startedAt



) {
}
