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

	@Query("SELECT f FROM Friend f WHERE f.user1Id = :userId1 AND f.user2Id IN "
			+ "(SELECT f2.user2Id FROM Friend f2 WHERE f2.user1Id = :userId2)")
	Page<Friend> findMutualFriends(
			@Param("userId1") String userId1, @Param("userId2") String userId2, Pageable pageable);

	@Query("SELECT u.id FROM User u WHERE u.id != :userId AND u.id NOT IN (" + "SELECT CASE "
			+ "WHEN f.user1Id = :userId THEN f.user2Id "
			+ "ELSE f.user1Id END "
			+ "FROM Friend f WHERE f.user1Id = :userId OR f.user2Id = :userId)")
	Page<String> findNonFriendUserIds(@Param("userId") String userId, Pageable pageable);

	@Query(
			value =
					"select case when count(f) > 0 then true else false end from Friend  f where (f.user1Id = ?1 and f.user2Id = ?2) or (f.user2Id = ?1 and f.user1Id = ?2)")
	boolean existsFriendByUser1IdAndUser2Id(String user1Id, String user2Id);
}
