package com.lemoo.user.repository;

import com.lemoo.user.common.enums.FriendInvitationStatus;
import com.lemoo.user.entity.FriendInvitation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendInvitationRepository extends JpaRepository<FriendInvitation, String> {

	Page<FriendInvitation> findByReceiverIdAndStatus(String userId, FriendInvitationStatus status, Pageable pageable);
}
