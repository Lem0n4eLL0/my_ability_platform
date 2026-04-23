package com.example.GigAnt.validator;

import com.example.GigAnt.annotation.ValidFile;
import jakarta.validation.ConstraintValidator;
import org.springframework.web.multipart.MultipartFile;

public interface FileValidatorInterface extends ConstraintValidator<ValidFile, MultipartFile> {

}
