package com.example.GigAnt.model.entity;

import com.example.GigAnt.authentication.model.entity.Account;
import com.example.GigAnt.entity.BaseEntity;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@ToString(onlyExplicitlyIncluded = true)
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user_profile")
public class UserProfile extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @ToString.Include
  @Column(name = "id", updatable = false, nullable = false)
  private Integer id;

  @OneToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(
      name = "account_id",
      unique = true,
      nullable = false,
      foreignKey = @ForeignKey(name = "fk_user_profile_account")
  )
  private Account account;

  @Column(name = "first_name", length = 100, nullable = false)
  private String firstName;

  @Column(name = "second_name", length = 100, nullable = false)
  private String secondName;

  @Column(name = "surname_name", length = 100)
  private String surnameName;

  @Column(name = "birth_date")
  private LocalDate birthDate;

  @Column(name = "about_me", columnDefinition = "TEXT")
  private String aboutMe;

  @Column(name = "contact_phone", length = 12)
  private String contactPhone;

  @Column(name = "github", length = 50)
  private String github;

  @OneToMany(mappedBy = "profile_id", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Certificates> certificates = new ArrayList<>();

  @OneToMany(mappedBy = "profile_id", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Education> educations = new ArrayList<>();

  @OneToMany(mappedBy = "profile_id", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<UserProjects> projects = new ArrayList<>();

  @OneToMany(mappedBy = "profile_id", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<WorkExperience> workExperiences = new ArrayList<>();


}