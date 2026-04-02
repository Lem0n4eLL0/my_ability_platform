package com.example.authenticaton.mapper;

import com.example.authenticaton.model.dto.request.RegisterRequest;
import com.example.authenticaton.model.dto.response.RegisterResponse;
import com.example.authenticaton.model.entity.Account;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RegisterMapper {

  Account toEntity(RegisterRequest request);

  RegisterResponse toModel(Account account);

}
