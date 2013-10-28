package com.hemouna.entidade;
// Generated 28/10/2013 09:47:21 by Hibernate Tools 3.6.0

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Paciente generated by hbm2java
 */
@Entity
@Table(name = "paciente", catalog = "hemounadb"
)
public class Paciente implements java.io.Serializable {

    private Integer id;
    private Tiposangue tiposangue;
    private Hospital hospital;
    private String cpf;
    private String nome;

    public Paciente() {
    }

    public Paciente(Tiposangue tiposangue, Hospital hospital, String cpf, String nome) {
        this.tiposangue = tiposangue;
        this.hospital = hospital;
        this.cpf = cpf;
        this.nome = nome;
    }

    @Id
    @GeneratedValue(strategy = IDENTITY)

    @Column(name = "id", unique = true, nullable = false)
    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @ManyToOne
    @JoinColumn(name = "tiposangue_id", nullable = false)
    public Tiposangue getTiposangue() {
        return this.tiposangue;
    }

    public void setTiposangue(Tiposangue tiposangue) {
        this.tiposangue = tiposangue;
    }

    @ManyToOne
    @JoinColumn(name = "hospital_id", nullable = false)
    public Hospital getHospital() {
        return this.hospital;
    }

    public void setHospital(Hospital hospital) {
        this.hospital = hospital;
    }

    @Column(name = "cpf", nullable = false, length = 11)
    public String getCpf() {
        return this.cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    @Column(name = "nome", nullable = false, length = 100)
    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

}
