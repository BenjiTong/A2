package com.light.repository;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.light.entity.GitUser;

@Repository
public interface UserRepository extends CrudRepository<GitUser, Long> {
}