package com.example.GigAnt.repository;

import com.example.GigAnt.model.entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TestRepository extends JpaRepository<Test, UUID> {
}