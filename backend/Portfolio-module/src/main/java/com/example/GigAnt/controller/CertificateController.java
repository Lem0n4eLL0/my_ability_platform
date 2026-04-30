package com.example.GigAnt.controller;

import static com.example.GigAnt.headers.AppHeaders.ACCOUNT_ID;

import com.example.GigAnt.model.dto.request.CertificateRequest;
import com.example.GigAnt.model.dto.response.CertificateResponse;
import com.example.GigAnt.service.CertificateService;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequiredArgsConstructor
@RestController
@RequestMapping("/me/certificates/")
public class CertificateController {
  private final CertificateService service;
  @PostMapping
  public ResponseEntity<CertificateResponse> createCertificates(@Validated @RequestBody
      CertificateRequest certificateRequest, @RequestAttribute(ACCOUNT_ID) @NotNull UUID accountId){
    return ResponseEntity.ok(service.createCertificate(certificateRequest,accountId));

  }

}
