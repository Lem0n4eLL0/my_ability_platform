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
@Table(name = "work_experience")
public class WorkExperience extends BaseEntity {



  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "profile_id", nullable = false, foreignKey = @ForeignKey(name = "fk_work_experience_profile"))
  private UserProfile profile;

  @Column(name = "city", nullable = false, length = 100)
  private String city;

  @Column(name = "company_name", nullable = false, length = 255)
  private String companyName;

  @Column(name = "post", nullable = false, length = 255)
  private String post;

  @Column(name = "start_date", nullable = false)
  private LocalDate startDate;

  @Column(name = "end_date")
  private LocalDate endDate;
}