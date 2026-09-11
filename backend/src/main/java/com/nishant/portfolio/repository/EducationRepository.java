package com.nishant.portfolio.repository;

import com.nishant.portfolio.entity.EducationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EducationRepository extends JpaRepository<EducationEntity, Long> {
    List<EducationEntity> findAllByOrderBySortOrderAsc();
    List<EducationEntity> findAllByVisibleTrueOrderBySortOrderAsc();
}
