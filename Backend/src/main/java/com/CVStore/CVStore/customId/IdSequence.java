package com.CVStore.CVStore.customId;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "id_sequence")
public class IdSequence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String sequenceName;

    private long lastNumber;

}
