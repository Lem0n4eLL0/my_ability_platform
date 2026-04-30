package com.example.GigAnt.repository;

import com.example.GigAnt.model.entity.Certificates;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CertificatesRepository extends BaseRepository<Certificates>{


}