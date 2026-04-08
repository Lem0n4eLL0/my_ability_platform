package com.example.GigAnt.service;

import com.example.GigAnt.dto.MediaDTO;
import com.example.GigAnt.entity.MediaAssetEntity;
import com.example.GigAnt.mapper.MediaMapper;
import com.example.GigAnt.repository.FileRepository;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileService implements FileStorage {

  @Autowired
  FileManager fileManager;
  @Autowired
  FileServiceStorage fileServiceStorage;
  @Autowired
  FileRepository fileRepository;
  @Autowired
  private MultiPartFileToDTO multiPartFileToDTO;
  @Autowired
  MediaMapper mapper;


  @Override
  @CircuitBreaker(name = "fileStorage", fallbackMethod = "saveFallback")
  public MediaAssetEntity save(MultipartFile file) {
    MediaDTO mediaDto = multiPartFileToDTO.toDTO(file);
    MediaAssetEntity entity = mapper.toEntity(mediaDto);
    return fileRepository.save(entity);
  }

  @Override
  @CircuitBreaker(name = "fileStorage", fallbackMethod = "loadFallback")
  public Resource load(int id) {
    MediaAssetEntity entity = fileServiceStorage.findById(id);
    Resource fileResource = new FileSystemResource(entity.getFilePath());
    return fileResource;
  }

  @Override
  @CircuitBreaker(name = "fileStorage", fallbackMethod = "deleteFallback")
  public void delete(int id) {
    MediaAssetEntity entity = fileServiceStorage.findById(id);
    MediaDTO dtoFile = mapper.toDto(entity);
    fileManager.delete(dtoFile);
    fileServiceStorage.deleteAllByPath(dtoFile.getFilePath());


  }

  private MediaAssetEntity saveFallback(MultipartFile file, Exception ex) {
    System.err.println("File save failed: " + ex.getMessage());
    return null;
  }

  public Resource loadFallback(int id, Exception ex) {
    System.err.println(
        "File service temporarily unavailable. Please try again later. " + ex.getMessage());
    return null;

  }

  public void deleteFallback(int id, Exception ex) {
    System.err.println("Circuit breaker opened for file delete:  " + ex.getMessage());
    return;

  }
}
