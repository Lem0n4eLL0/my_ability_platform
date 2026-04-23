package com.example.GigAnt.validator;

import com.example.GigAnt.annotation.ValidFile;
import jakarta.validation.ConstraintValidatorContext;
import java.util.Arrays;
import org.springframework.web.multipart.MultipartFile;

public class FileValidator implements FileValidatorInterface {

  private long maxSize;
  private String[] allowedTypes;

  public void initialize(ValidFile constraintAnnotation) {
    this.maxSize = constraintAnnotation.maxSize();
    this.allowedTypes = constraintAnnotation.allowedTypes();
  }

  @Override
  public boolean isValid(MultipartFile multipartFile,
      ConstraintValidatorContext constraintValidatorContext) {
    if (multipartFile.isEmpty() || multipartFile == null) {
      return false;
    }
    if (multipartFile.getSize() > maxSize) {
      return false;
    }
    String contentType = multipartFile.getContentType();
    return Arrays.asList(allowedTypes).contains(contentType);
  }
}
