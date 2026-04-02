package com.example.dto;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class MediaDTO {

  @Column(name = "filename")
  private String fileName;

  @Column(name = "filepath")
  private String filePath;

  @Column(name = "contenttype")
  private String contentType;
  private Long fileSize;

  @Column(name = "checksum")
  private String checkSum;

  public MediaDTO(String fileName, String filePath, String contentType, Long fileSize,
      String checkSum) {
    this.fileName = fileName;
    this.filePath = filePath;
    this.contentType = contentType;
    this.fileSize = fileSize;
    this.checkSum = checkSum;
  }

  public MediaDTO(Long fileSize) {
    this.fileSize = fileSize;
  }

  public Long getFileSize() {
    return fileSize;
  }

  public void setFileSize(Long fileSize) {
    this.fileSize = fileSize;
  }

  public MediaDTO() {
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
}
