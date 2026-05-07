package com.example.GigAnt.controller;

import com.example.GigAnt.model.dto.response.TestQuestionResponse;
import com.example.GigAnt.service.StartTestService;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import static com.example.GigAnt.headers.AppHeaders.ACCOUNT_ID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/tests")
public class PassingTestController {
    private final StartTestService startTestService;

    @PostMapping("start/{testId}")
    public List<TestQuestionResponse> startTest(@PathVariable @NotNull UUID testId, @RequestAttribute(ACCOUNT_ID) @NotNull UUID accountId){
        return startTestService.startTest(testId, accountId);

    }
}
