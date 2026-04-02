package com.example.service;

import com.example.dto.MediaDTO;
import java.io.BufferedInputStream;
import java.io.IOException;
import java.security.DigestInputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class MultiPartFileToDTO {

  static final String BASE_PATH = "C:\\Users\\ZAQ\\IdeaProjects\\StudentsProject\\media\\media\\";
  @Autowired
  FileManager fileManager;


  MediaDTO toDTO(MultipartFile file) {
    try {
      var messageDigest = MessageDigest.getInstance("MD5");
      String checkSum = calculateChecksumFromMultipartFile(file, messageDigest);
      System.out.println("Calculated checksum: " + checkSum);
      String deterministicPath = createDeterministicPath(checkSum, file.getOriginalFilename());
      String finalFilePath = BASE_PATH + deterministicPath;
      String fileName = checkSum + "." + getFileExtension(file.getOriginalFilename());
      MultipartFile newFile = file;
      fileManager.save(file, finalFilePath);

      MediaDTO mediaCreateDTO = new MediaDTO(
          fileName,
          finalFilePath,
          file.getContentType(),
          file.getSize(),
          checkSum
      );
      return mediaCreateDTO;

    } catch (NoSuchAlgorithmException e) {
      throw new RuntimeException("MD5 algorithm not available", e);
    } catch (IOException e) {
      throw new RuntimeException("Failed to process file", e);
    } catch (Exception e) {
      throw new RuntimeException("Unexpected error during file conversion", e);
    }
  }

  private static String calculateChecksumFromMultipartFile(MultipartFile file, MessageDigest md)
      throws IOException {
    try (var inputStream = file.getInputStream();
        var bufferedStream = new BufferedInputStream(inputStream);
        var digestStream = new DigestInputStream(bufferedStream, md)) {
      while (digestStream.read() != -1)
        ;
      md = digestStream.getMessageDigest();

      var result = new StringBuilder();
      for (byte b : md.digest()) {
        result.append(String.format("%02x", b));
      }
      return result.toString();
    }
  }

  private static String createDeterministicPath(String checksum, String originalFilename) {
    String folder = checksum.substring(0, 2);
    String extension = getFileExtension(originalFilename);
    String filename = checksum + "." + extension;
    return folder + "\\" + filename;
  }

  private static String getFileExtension(String filename) {
    if (filename == null || !filename.contains(".")) {
      return "bin";
    }
    return filename.substring(filename.lastIndexOf(".") + 1);
  }


}