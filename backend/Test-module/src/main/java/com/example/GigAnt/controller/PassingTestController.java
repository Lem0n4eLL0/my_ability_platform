package com.example.GigAnt.controller;

import com.example.GigAnt.model.dto.response.TestQuestionResponse;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

import static com.example.GigAnt.headers.AppHeaders.ACCOUNT_ID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/tests")
public class PassingTestController {

    @PostMapping("start/{testId}")
    public TestQuestionResponse startTest(@PathVariable @NotNull UUID testId,  @RequestAttribute(ACCOUNT_ID) @NotNull UUID accountId){


    }
}
