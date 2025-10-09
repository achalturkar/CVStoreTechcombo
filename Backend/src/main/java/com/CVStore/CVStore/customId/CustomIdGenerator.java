package com.CVStore.CVStore.customId;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Year;

@Service
public class CustomIdGenerator {


    @Autowired
    private IdSequenceRepository idSequenceRepository;

    @Transactional
    public String generateCustomId(String sequenceName, String prefix){

        String year = String.valueOf(Year.now().getValue());

        IdSequence seq =  idSequenceRepository.findBySequenceName(sequenceName)
                .orElseGet(() -> {
                    IdSequence newSeq = new IdSequence();
                    newSeq.setSequenceName(sequenceName);
                    newSeq.setLastNumber(0L);
                    return newSeq;
                });


        long nextNumber = seq.getLastNumber() + 1;
        seq.setLastNumber(nextNumber);
        idSequenceRepository.save(seq);

        return prefix + year + String.format("%06d", nextNumber);


    }

    public String generateUserId() {
        return generateCustomId("USER", "TC"); // e.g. TC2025000001
    }
}
