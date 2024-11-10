package com.lemoo.user.repository;

import com.lemoo.user.entity.Friend;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FriendRepository extends JpaRepository<Friend, String> {

    @Query("SELECT f FROM Friend f WHERE (f.user1Id = :userId OR f.user2Id = :userId)")
    Page<Friend> findAllByUserId(@Param("userId") String userId, Pageable pageable);

    @Query("SELECT f FROM Friend f WHERE f.user1Id = :userId1 AND f.user2Id IN " +
            "(SELECT f2.user2Id FROM Friend f2 WHERE f2.user1Id = :userId2)")
    Page<Friend> findMutualFriends(@Param("userId1") String userId1,
                                   @Param("userId2") String userId2,
                                   Pageable pageable);

    @Query("SELECT f FROM Friend f WHERE f.user1Id != :userId AND f.user2Id != :userId " +
            "AND (f.user1Id NOT IN (SELECT fr.user1Id FROM Friend fr WHERE fr.user2Id = :userId) " +
            "AND f.user2Id NOT IN (SELECT fr.user2Id FROM Friend fr WHERE fr.user1Id = :userId))")
    Page<Friend> findRecommendList(@Param("userId") String userId, Pageable pageable);

}
