package com.example.validator;

import com.example.annotation.ValidFile;
import jakarta.validation.ConstraintValidator;
import org.springframework.web.multipart.MultipartFile;

public interface FileValidatorInterface extends ConstraintValidator<ValidFile, MultipartFile> {

}
