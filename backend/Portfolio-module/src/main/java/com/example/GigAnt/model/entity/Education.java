package com.example.GigAnt.model.entity;

import com.example.GigAnt.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.UUID;

@ToString(onlyExplicitlyIncluded = true)
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "education")
public class Education extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id", updatable = false, nullable = false)
  private UUID id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "profile_id", nullable = false, foreignKey = @ForeignKey(name = "fk_education_profile"))
  private UserProfile profile;

  @Column(name = "city", nullable = false, length = 255)
  private String city;

  @Column(name = "university", nullable = false, length = 255)
  private String university;

  @Column(name = "faculty", nullable = false, length = 255)
  private String faculty;

  @Column(name = "specialization", nullable = false, length = 255)
  private String specialization;

  @Column(name = "status", nullable = false, length = 255)
  private String status;

  @Column(name = "graduation_date", nullable = false)
  private LocalDate graduationDate;


}