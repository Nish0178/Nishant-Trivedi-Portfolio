package com.nishant.portfolio.repository;

import com.nishant.portfolio.entity.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<ProjectEntity, String> {
    List<ProjectEntity> findAllByOrderBySortOrderAsc();
    List<ProjectEntity> findAllByVisibleTrueOrderBySortOrderAsc();
    long countByVisibleTrue();
}
