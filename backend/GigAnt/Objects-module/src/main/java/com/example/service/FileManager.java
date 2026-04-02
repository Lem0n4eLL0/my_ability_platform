package com.example.service;

import com.example.dto.MediaDTO;
import com.example.entity.MediaAssetEntity;
import java.io.IOException;
import java.util.concurrent.CompletableFuture;
import org.springframework.web.multipart.MultipartFile;


public interface FileManager {

  CompletableFuture<MediaAssetEntity> save(MultipartFile file, String filePath) throws IOException;

  CompletableFuture<Void> delete(MediaDTO file);
}