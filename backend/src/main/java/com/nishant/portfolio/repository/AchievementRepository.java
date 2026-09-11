package com.nishant.portfolio.repository;

import com.nishant.portfolio.entity.AchievementEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AchievementRepository extends JpaRepository<AchievementEntity, Long> {
    List<AchievementEntity> findAllByOrderBySortOrderAsc();
    List<AchievementEntity> findAllByVisibleTrueOrderBySortOrderAsc();
}
