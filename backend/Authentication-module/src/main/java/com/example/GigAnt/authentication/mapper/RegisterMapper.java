package com.example.GigAnt.authentication.mapper;

import com.example.GigAnt.authentication.enums.AccountRole;
import com.example.GigAnt.authentication.model.dto.request.RegisterRequest;
import com.example.GigAnt.authentication.model.dto.response.RegisterResponse;
import com.example.GigAnt.authentication.model.entity.Account;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", imports = AccountRole.class)
public interface RegisterMapper {

  @Mapping(target = "role", defaultExpression = "java(AccountRole.USER)")
  Account toEntity(RegisterRequest request);

  RegisterResponse toModel(Account account);

}
