package com.lemoo.user.repository;

import com.lemoo.user.entity.FriendRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, String> {
}
