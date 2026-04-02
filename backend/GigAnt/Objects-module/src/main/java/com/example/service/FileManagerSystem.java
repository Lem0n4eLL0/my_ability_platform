package com.example.service;

import com.example.dto.MediaDTO;
import com.example.entity.MediaAssetEntity;
import io.github.resilience4j.retry.annotation.Retry;
import io.github.resilience4j.timelimiter.annotation.TimeLimiter;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeoutException;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileManagerSystem implements FileManager {

  @TimeLimiter(name = "fileOperations", fallbackMethod = "saveTimeoutFallback")
  @Retry(name = "fileOperations", fallbackMethod = "saveRetryFallback")
  @Override
  public CompletableFuture<MediaAssetEntity> save(MultipartFile file, String filePath)
      throws IOException {
    System.out.println("FILESIZE - " + file.getSize() + " path: " + filePath);

    return CompletableFuture.supplyAsync(() -> {
      try {
        File destination = new File(filePath);
        File parentDir = destination.getParentFile();
        if (!parentDir.exists() && !parentDir.mkdirs()) {
          throw new IOException("Не удалось создать директорию: " + parentDir);
        }
        file.transferTo(destination);
        MediaAssetEntity entity = new MediaAssetEntity();
        entity.setFileName(file.getOriginalFilename());
        entity.setFilePath(filePath);
        entity.setFileSize(file.getSize());
        entity.setContentType(file.getContentType());
        return entity;

      } catch (IOException e) {
        throw new RuntimeException("File save error", e);
      }
    });
  }

  @Override
  @TimeLimiter(name = "fileOperations", fallbackMethod = "deleteTimeoutFallback")
  @Retry(name = "fileOperations", fallbackMethod = "deleteRetryFallback")
  public CompletableFuture<Void> delete(MediaDTO file) {
    System.out.println(file.getFilePath());
    return CompletableFuture.runAsync(() -> {
      Path path = Path.of(file.getFilePath());
      if (!Files.exists(path)) {
        throw new RuntimeException("File not found: " + file.getFileName());
      }
      if (!Files.isRegularFile(path)) {
        throw new RuntimeException("Path is not a file: " + file.getFileName());
      }
      try {
        Files.delete(path);
        System.out.println("File deleted successfully: " + file.getFileName());
      } catch (IOException e) {
        throw new RuntimeException("Failed to delete file: " + file.getFileName(), e);
      }
    });
  }

  public CompletableFuture<MediaAssetEntity> saveTimeoutFallback(MultipartFile file,
      String filePath, TimeoutException e) {
    System.err.println("File save timeout for: " + filePath);
    return CompletableFuture.completedFuture(null);
  }

  public CompletableFuture<MediaAssetEntity> saveRetryFallback(MultipartFile file, String filePath,
      Exception e) {
    System.err.println("All retry attempts failed for file save: " + filePath);
    System.err.println("Error: " + e.getMessage());
    return CompletableFuture.completedFuture(null);
  }

  public void deleteTimeoutFallback(MediaDTO file, TimeoutException e) {
    System.err.println("File delete timeout for: " + file.getFileName());

  }


  public void deleteRetryFallback(MediaDTO file, Exception e) {
    System.err.println("All retry attempts failed for file delete: " + file.getFileName());

  }
}
