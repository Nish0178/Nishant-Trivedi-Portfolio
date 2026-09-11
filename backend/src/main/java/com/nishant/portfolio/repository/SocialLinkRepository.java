package com.nishant.portfolio.repository;

import com.nishant.portfolio.entity.SocialLinkEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SocialLinkRepository extends JpaRepository<SocialLinkEntity, Long> {
    List<SocialLinkEntity> findAllByOrderBySortOrderAsc();
    List<SocialLinkEntity> findAllByVisibleTrueOrderBySortOrderAsc();
}
