package com.example.GigAnt.service;

import com.example.GigAnt.model.dto.response.ShareLinkResponse;
import com.example.GigAnt.model.entity.UserProfile;
import com.example.GigAnt.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ShareLinkProfileService {
    @Value("${api.domain}")
    private String apiDomain;

    @Value("${api.version}")
    private String appVersion;

    private final ProfileRepository repository;
    public ShareLinkResponse getShareLink(UUID accountId){
        UserProfile profile = repository.getByAccountId(accountId);
        String resource = "/profile/";
        return new ShareLinkResponse(apiDomain + "/api/" + appVersion +resource+profile.getPublicId().toString());
    }
}
