package com.example.GigAnt.contract;

import com.example.GigAnt.model.dto.response.ProfileDtoResponse;

import java.util.UUID;

public interface ProfileApiInterface {
    Integer getProfileIdByAccountId(UUID accountId);
//    ProfileDtoResponse getProfileByAccountId(Long accountId);
}