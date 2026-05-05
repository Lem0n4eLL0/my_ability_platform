package com.example.GigAnt.service;

import com.example.GigAnt.mapper.CriteriaQuestionTypeCountMapper;
import com.example.GigAnt.mapper.TestMapper;
import com.example.GigAnt.model.dto.response.CriteriaQuestionTypeCountResponse;
import com.example.GigAnt.model.dto.response.TestsResponse;
import com.example.GigAnt.model.entity.CriteriaQuestionTypeCount;
import com.example.GigAnt.model.entity.Test;
import com.example.GigAnt.model.entity.TestCriteria;
import com.example.GigAnt.model.enums.Difficulty;
import com.example.GigAnt.repository.CriteriaQuestionTypeCountRepository;
import com.example.GigAnt.repository.TestCriteriaRepository;
import com.example.GigAnt.repository.TestFilterRepository;
import com.example.GigAnt.repository.TestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class TestService {
    private final TestFilterRepository repository;
    private final TestRepository testRepository;
    private final TestCriteriaRepository testCriteriaRepository;
    private final TestMapper mapper;
    private final CriteriaQuestionTypeCountMapper criteriaTypeMapper;
    private final CriteriaQuestionTypeCountRepository criteriaTypeCountRepository;

    public List<TestsResponse> getTests(int limit, int offset, String title, List<Difficulty> difficulty){
        int page = offset / limit;
        Pageable pageable = PageRequest.of(page, limit);

        Page<Test> testPage = repository.findByFilters(difficulty, title, pageable);
        List<Test> tests = testPage.stream().toList();
        return mapper.toModelList(tests);

    }
    public TestsResponse getTest(UUID testId){
        Test test = testRepository.getReferenceById(testId);
        List<TestCriteria>  testCriteriaList= testCriteriaRepository.findAllByTestId(testId);
        List<CriteriaQuestionTypeCountResponse> questionTypeCountResponseList = new ArrayList<>();
        for(TestCriteria testCriteria:testCriteriaList){
            List<CriteriaQuestionTypeCount> criteriaTypeCount = criteriaTypeCountRepository.findAllByTestCriteriaId(testCriteria.getId());
            questionTypeCountResponseList.addAll(criteriaTypeMapper.toModelList(criteriaTypeCount));
        }
        TestsResponse testsResponse = TestsResponse.of(test,questionTypeCountResponseList);
        return testsResponse;

    }

}
