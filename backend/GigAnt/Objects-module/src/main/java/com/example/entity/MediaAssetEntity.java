package com.example.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "mediaasset")
@Schema(description = "Сущность MediaAsset")
public class MediaAssetEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private int id;

  @Column(name = "filename")
  private String fileName;

  @Column(name = "filepath")
  private String filePath;

  @Column(name = "filesize")
  private Long fileSize;

  @Column(name = "contenttype")
  private String contentType;

  @Column(name = "checksum")
  private String checkSum;

  @Column(name = "createdat",
      columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
      updatable = false)
  private LocalDateTime createdAt;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getFileName() {
    return fileName;
  }

  public void setFileName(String fileName) {
    this.fileName = fileName;
  }

  public String getFilePath() {
    return filePath;
  }

  public void setFilePath(String filePath) {
    this.filePath = filePath;
  }

  public Long getFileSize() {
    return fileSize;
  }

  public void setFileSize(Long fileSize) {
    this.fileSize = fileSize;
  }

  public String getContentType() {
    return contentType;
  }

  public void setContentType(String contentType) {
    this.contentType = contentType;
  }

  public String getCheckSum() {
    return checkSum;
  }

  public void setCheckSum(String checkSum) {
    this.checkSum = checkSum;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }
}
