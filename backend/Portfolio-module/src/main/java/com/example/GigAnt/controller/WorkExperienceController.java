package com.example.GigAnt.controller;

import com.example.GigAnt.model.dto.request.ProjectsRequest;
import com.example.GigAnt.model.dto.request.WorkExperienceRequest;
import com.example.GigAnt.model.dto.response.ProjectResponse;
import com.example.GigAnt.model.dto.response.WorkExperienceResponse;
import com.example.GigAnt.service.UserProjectsService;
import com.example.GigAnt.service.WorkExperienceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

import static com.example.GigAnt.headers.AppHeaders.ACCOUNT_ID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/me/workExperience/")
public class WorkExperienceController {
    private final WorkExperienceService workExperienceService;
    @PostMapping
    public ResponseEntity<WorkExperienceResponse> createEducation(@Validated @RequestBody
                                                                  WorkExperienceRequest request, @RequestAttribute(ACCOUNT_ID) UUID accountId){
        return ResponseEntity.ok(workExperienceService.createWorkExperience(request, accountId));

    }
}
