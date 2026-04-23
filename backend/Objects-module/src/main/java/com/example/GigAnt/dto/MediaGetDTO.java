package com.example.GigAnt.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "Данные медиа-файла для получения")
public class MediaGetDTO {

  @Schema(description = "Имя файла", example = "presentation.pdf")
  private String fileName;

  @Schema(description = "Путь к файлу", example = "/uploads/a1b2c3_presentation.pdf")
  private String filePath;

  @Schema(description = "Тип содержимого", example = "application/pdf")
  private String contentType;


  public MediaGetDTO() {
  }

  public MediaGetDTO(String fileName, String filePath, String contentType) {
    this.fileName = fileName;
    this.filePath = filePath;
    this.contentType = contentType;
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
}