package com.nishant.portfolio.repository;

import com.nishant.portfolio.entity.CmsSection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CmsSectionRepository extends JpaRepository<CmsSection, String> {
    Optional<CmsSection> findBySectionKeyIgnoreCase(String sectionKey);
}
