package com.example.controller;

import com.example.annotation.ValidFile;
import com.example.entity.MediaAssetEntity;
import com.example.service.FileStorage;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@Tag(name = "MediaController", description = "Обрабатывает запросы на скаичивание/получение файлов")
@RequestMapping("/api/media")
public class MediaController {

  @Autowired
  FileStorage fileStorage;

  public MediaController(FileStorage fileStorage) {
    this.fileStorage = fileStorage;
  }

  @PostMapping
  public MediaAssetEntity save(@ValidFile(maxSize = 5 * 1024 * 1024,
      allowedTypes = {"image/png", "image/jpeg", "image/webp",
          "image/jpg"}) @RequestParam("file") MultipartFile file) {
    return fileStorage.save(file);
  }

  @GetMapping("/download/{id}")
  public ResponseEntity<Resource> load(@PathVariable int id) throws IOException {
    Resource resourceFile = fileStorage.load(id);
    HttpHeaders headers = new HttpHeaders();
    headers.add(HttpHeaders.CONTENT_DISPOSITION,
        "attachment; filename=\"" + resourceFile.getFilename() + "\"");

    return ResponseEntity.ok()
        .headers(headers)
        .contentLength(resourceFile.contentLength())
        .contentType(MediaType.APPLICATION_OCTET_STREAM)
        .body(resourceFile);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT) // 204 No Content
  public void delete(@PathVariable int id) throws IOException {
    fileStorage.delete(id);
  }


}
