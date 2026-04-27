package com.example.GigAnt.mapper;


import com.example.GigAnt.model.dto.request.CertificateRequest;
import com.example.GigAnt.model.dto.response.CertificateResponse;
import com.example.GigAnt.model.entity.Certificates;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.util.List;

@Mapper(componentModel = "spring")
public interface CertificateMapper {

  CertificateResponse toModel(Certificates certificate);

  Certificates toEntity(CertificateRequest request);

  List<CertificateResponse> toModelList(List<Certificates> certificates);

  List<Certificates> toEntityList(List<CertificateRequest> requests);
}