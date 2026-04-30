package com.example.GigAnt.repository;

import com.example.GigAnt.model.entity.Certificates;
import com.example.GigAnt.model.entity.Education;
import com.example.GigAnt.model.entity.WorkExperience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface WorkExperienceRepository extends BaseRepository<WorkExperience>{
}