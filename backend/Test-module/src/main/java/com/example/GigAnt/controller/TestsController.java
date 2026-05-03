package com.example.GigAnt.controller;

import com.example.GigAnt.model.dto.response.TestsResponse;
import com.example.GigAnt.model.enums.Difficulty;
import com.example.GigAnt.service.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/tests")
public class TestsController {
    private final TestService service;

    @GetMapping
    public ResponseEntity<List<TestsResponse>> getTests(@RequestParam(required = false, defaultValue = "10") int limit,
                                   @RequestParam(required = false, defaultValue = "0") int offset,
                                   @RequestParam(required = false) String title,
                                   @RequestParam(required = false) List<Difficulty> difficulty){

        return ResponseEntity.ok(service.getTests(limit,offset,title,difficulty));




    }


}
