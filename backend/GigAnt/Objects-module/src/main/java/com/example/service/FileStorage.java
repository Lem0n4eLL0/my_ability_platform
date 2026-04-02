package com.example.service;

import com.example.entity.MediaAssetEntity;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public interface FileStorage {

  public MediaAssetEntity save(MultipartFile file);

  public Resource load(int id);

  public void delete(int id);


}
