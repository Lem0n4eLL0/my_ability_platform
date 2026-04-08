package com.example.GigAnt.authentication.mapper;

import com.example.GigAnt.authentication.model.dto.request.RegisterRequest;
import com.example.GigAnt.authentication.model.dto.response.RegisterResponse;
import com.example.GigAnt.authentication.model.entity.Account;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RegisterMapper {

  Account toEntity(RegisterRequest request);

  RegisterResponse toModel(Account account);

}
