package com.example.GigAnt.service;

import com.example.GigAnt.dto.MediaDTO;
import com.example.GigAnt.entity.MediaAssetEntity;
import com.example.GigAnt.mapper.MediaMapper;
import com.example.GigAnt.repository.FileRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FileServiceStorage {

  @Autowired
  FileRepository fileRepository;
  @Autowired
  MediaMapper mapper;

  public MediaAssetEntity save(MediaDTO file) {
    MediaAssetEntity entity = mapper.toEntity(file);
    return fileRepository.save(entity);
  }

  public MediaAssetEntity findById(int id) {
    Optional<MediaAssetEntity> optionalMediaAsset = fileRepository.findById(id);
    MediaAssetEntity entity = optionalMediaAsset.get();
    return entity;
  }

  public void deleteAllByPath(String filePath) {
    List<MediaAssetEntity> entities = fileRepository.findByFilePath(filePath);
    for (MediaAssetEntity entity : entities) {
      fileRepository.deleteById(entity.getId());
    }
  }


  public void load() {

  }


  public void delete() {

  }
}
