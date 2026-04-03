package com.example.authentication.mapper;

import com.example.authentication.model.dto.request.RegisterRequest;
import com.example.authentication.model.dto.response.RegisterResponse;
import com.example.authentication.model.entity.Account;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RegisterMapper {

  Account toEntity(RegisterRequest request);

  RegisterResponse toModel(Account account);

}
