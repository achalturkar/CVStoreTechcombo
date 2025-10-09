package com.CVStore.CVStore.customId;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IdSequenceRepository extends JpaRepository<IdSequence, Long> {

    Optional<IdSequence> findBySequenceName(String sequenceName);
}
