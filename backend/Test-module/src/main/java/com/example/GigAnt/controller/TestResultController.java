package com.example.GigAnt.controller;

import com.example.GigAnt.model.dto.response.TestResultResponse;
import com.example.GigAnt.service.TestResultService;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

import static com.example.GigAnt.headers.AppHeaders.ACCOUNT_ID;

@RestController
@RequiredArgsConstructor
@RequestMapping("me/test-results")
public class TestResultController {
    private final TestResultService service;

    @GetMapping
    public ResponseEntity<List<TestResultResponse>> getTestResult(@RequestAttribute(ACCOUNT_ID) @NotNull UUID accountId){
        return ResponseEntity.ok(service.getResultTests(accountId));
    }

}
