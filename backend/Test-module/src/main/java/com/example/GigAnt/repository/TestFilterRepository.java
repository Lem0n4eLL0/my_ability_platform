package com.example.GigAnt.repository;

import com.example.GigAnt.model.entity.Test;
import com.example.GigAnt.model.enums.Difficulty;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface TestFilterRepository {
    Page<Test> findByFilters(List<Difficulty> types, String name, Pageable pageable);
}