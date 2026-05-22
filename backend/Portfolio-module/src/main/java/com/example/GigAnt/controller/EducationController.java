package com.example.GigAnt.controller;

import com.example.GigAnt.model.dto.request.CertificateRequest;
import com.example.GigAnt.model.dto.request.EducationRequest;
import com.example.GigAnt.model.dto.response.EducationResponse;
import com.example.GigAnt.service.EducationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

import static com.example.GigAnt.headers.AppHeaders.ACCOUNT_ID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/me/education/")
public class EducationController {
    private final EducationService educationService;

    public ResponseEntity<EducationResponse> createEducation(@Validated @RequestBody
                                                             EducationRequest educationRequest, @RequestAttribute(ACCOUNT_ID) UUID accountId){
        return ResponseEntity.ok(educationService.createEducation(educationRequest, accountId));

    }
}
