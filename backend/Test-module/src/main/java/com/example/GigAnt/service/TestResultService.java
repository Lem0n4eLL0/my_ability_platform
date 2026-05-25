package com.example.GigAnt.service;

import com.example.GigAnt.contract.ProfileApiInterface;
import com.example.GigAnt.mapper.TestAttemptsMapper;
import com.example.GigAnt.model.dto.response.TestResultResponse;
import com.example.GigAnt.model.entity.TestAttempts;
import com.example.GigAnt.repository.TestAttemptsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Slf4j
@Service
public class TestResultService {
    private final ProfileApiInterface profileApi;
    private final TestAttemptsRepository attemptsRepository;
    private final TestAttemptsMapper mapper;

    public List<TestResultResponse> getResultTests(UUID accountId){
        UUID profileId = profileApi.getProfileIdByAccountId(accountId);
        List<TestAttempts> testAttempts = attemptsRepository.findBestPassedAttemptsByProfile(profileId, LocalDateTime.now());

        List<TestResultResponse> testResultResponses = mapper.toModelList(testAttempts);
        return mapper.toModelList(testAttempts);
    }
}
