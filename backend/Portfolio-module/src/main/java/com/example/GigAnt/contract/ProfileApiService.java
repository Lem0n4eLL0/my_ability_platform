package com.example.GigAnt.contract;

import com.example.GigAnt.exception.ProfileNotFounded;
import com.example.GigAnt.model.entity.UserProfile;
import com.example.GigAnt.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileApiService implements ProfileApiInterface {
    private final ProfileRepository profileRepository;

    @Override
    public Integer getProfileIdByAccountId(UUID accountId) {
        UserProfile  userProfile= profileRepository.getByAccountId(accountId);
        if(Objects.isNull(userProfile)) throw new ProfileNotFounded();
        return userProfile.getId();
    }
}