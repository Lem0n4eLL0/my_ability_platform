package com.example.GigAnt.mapper;

import com.example.GigAnt.dto.MediaDTO;
import com.example.GigAnt.entity.MediaAssetEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MediaMapper {

  @Mapping(target = "id", ignore = true) // id генерируется БД
  @Mapping(target = "createdAt", ignore = true)
  MediaAssetEntity toEntity(MediaDTO dto);

  MediaDTO toDto(MediaAssetEntity entity);
}
