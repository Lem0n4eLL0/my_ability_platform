package com.example.GigAnt.service;

import com.example.GigAnt.contract.ProfileApiService;
import com.example.GigAnt.mapper.TestAttemptsMapper;
import com.example.GigAnt.model.dto.external.TestAttemptsDto;
import com.example.GigAnt.model.dto.response.TestQuestionResponse;
import com.example.GigAnt.model.entity.Test;
import com.example.GigAnt.model.entity.TestAttempts;
import com.example.GigAnt.model.enums.TestAttemptStatus;
import com.example.GigAnt.repository.TestAttemptsRepository;
import com.example.GigAnt.repository.TestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class StartTestService {

    private final TestRepository testRepository;
    private final ProfileApiService profileApiService;
    private final TestAttemptsRepository repository;
    private final TestAttemptsMapper attemptsMapper;


    public TestQuestionResponse startTest(UUID testId, UUID accountId){
        Integer profileId = profileApiService.getProfileIdByAccountId(accountId);
        Test test = testRepository.getReferenceById(testId);

        TestAttemptsDto testAttemptsDto = new TestAttemptsDto(profileId, TestAttemptStatus.PENDING,0,0,0,LocalDateTime.now());
        TestAttempts testAttempts = attemptsMapper.toEntity(testAttemptsDto);


    }

}
