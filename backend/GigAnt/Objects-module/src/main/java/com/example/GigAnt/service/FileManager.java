package com.example.GigAnt.service;

import com.example.GigAnt.dto.MediaDTO;
import com.example.GigAnt.entity.MediaAssetEntity;
import java.io.IOException;
import java.util.concurrent.CompletableFuture;
import org.springframework.web.multipart.MultipartFile;


public interface FileManager {

  CompletableFuture<MediaAssetEntity> save(MultipartFile file, String filePath) throws IOException;

  CompletableFuture<Void> delete(MediaDTO file);
}