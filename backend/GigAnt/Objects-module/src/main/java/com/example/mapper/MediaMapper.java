package com.example.mapper;

import com.example.dto.MediaDTO;
import com.example.entity.MediaAssetEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MediaMapper {

  @Mapping(target = "id", ignore = true) // id генерируется БД
  @Mapping(target = "createdAt", ignore = true)
  MediaAssetEntity toEntity(MediaDTO dto);

  MediaDTO toDto(MediaAssetEntity entity);
}
