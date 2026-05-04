package com.example.GigAnt.service;

import com.example.GigAnt.mapper.TestMapper;
import com.example.GigAnt.model.dto.response.TestsResponse;
import com.example.GigAnt.model.entity.Test;
import com.example.GigAnt.model.enums.Difficulty;
import com.example.GigAnt.repository.TestFilterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class TestService {
    private final TestFilterRepository repository;
    private final TestMapper mapper;

    public List<TestsResponse> getTests(int limit, int offset, String title, List<Difficulty> difficulty){
        int page = offset / limit;
        Pageable pageable = PageRequest.of(page, limit);

        Page<Test> testPage = repository.findByFilters(difficulty, title, pageable);
        List<Test> tests = testPage.stream().toList();
        return mapper.toModelList(tests);

    }

}
