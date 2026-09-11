package com.nishant.portfolio.repository;

import com.nishant.portfolio.entity.ExperienceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExperienceRepository extends JpaRepository<ExperienceEntity, Long> {
    List<ExperienceEntity> findAllByOrderBySortOrderAsc();
    List<ExperienceEntity> findAllByVisibleTrueOrderBySortOrderAsc();
    long countByVisibleTrue();
}
