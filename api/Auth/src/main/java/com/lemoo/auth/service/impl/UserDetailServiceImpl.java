/*
 *  UserDetailServiceImpl
 *  @author: Minhhieuano
 *  @created 10/19/2024 12:26 AM
 * */

package com.lemoo.auth.service.impl;

import com.lemoo.auth.exception.NotfoundException;
import com.lemoo.auth.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailServiceImpl implements UserDetailsService {

	private final AccountRepository accountRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return accountRepository.findById(username).orElseThrow(() -> new NotfoundException("Account not found."));
	}
}
