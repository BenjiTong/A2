package com.light.repository;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.light.entity.GitUser;

@Repository
public interface UserRepository extends CrudRepository<GitUser, Long> {
}