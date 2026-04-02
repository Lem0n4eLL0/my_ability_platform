package com.example.repository;

import com.example.entity.MediaAssetEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends JpaRepository<MediaAssetEntity, Integer> {

  List<MediaAssetEntity> findByFilePath(String filePath);
}
