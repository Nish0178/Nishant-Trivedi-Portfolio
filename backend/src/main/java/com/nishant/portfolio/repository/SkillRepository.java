package com.nishant.portfolio.repository;

import com.nishant.portfolio.entity.SkillEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillRepository extends JpaRepository<SkillEntity, Long> {
    List<SkillEntity> findAllByOrderBySortOrderAsc();
    List<SkillEntity> findAllByVisibleTrueOrderBySortOrderAsc();
    List<SkillEntity> findAllByCategoryIgnoreCaseAndVisibleTrueOrderBySortOrderAsc(String category);
}
