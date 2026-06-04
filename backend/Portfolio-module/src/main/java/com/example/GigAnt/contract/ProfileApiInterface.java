package com.example.GigAnt.contract;

import com.example.GigAnt.model.dto.response.ProfileDtoResponse;

import java.util.UUID;

public interface ProfileApiInterface {
    UUID getProfileIdByAccountId(UUID accountId);

}