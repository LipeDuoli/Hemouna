package com.hemouna.entidade;
// Generated 27/10/2013 19:16:15 by Hibernate Tools 3.6.0

import java.util.HashSet;
import java.util.Set;

/**
 * Tiposangue generated by hbm2java
 */
public class Tiposangue implements java.io.Serializable {

    private Integer id;
    private String tiposangue;
    private Set<Bolsadesangue> bolsadesangues = new HashSet(0);
    private Set<Paciente> pacientes = new HashSet(0);

    public Tiposangue() {
    }

    public Tiposangue(String tiposangue) {
        this.tiposangue = tiposangue;
    }

    public Tiposangue(String tiposangue, Set<Bolsadesangue> bolsadesangues, Set<Paciente> pacientes) {
        this.tiposangue = tiposangue;
        this.bolsadesangues = bolsadesangues;
        this.pacientes = pacientes;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTiposangue() {
        return this.tiposangue;
    }

    public void setTiposangue(String tiposangue) {
        this.tiposangue = tiposangue;
    }

    public Set<Bolsadesangue> getBolsadesangues() {
        return this.bolsadesangues;
    }

    public void setBolsadesangues(Set<Bolsadesangue> bolsadesangues) {
        this.bolsadesangues = bolsadesangues;
    }

    public Set<Paciente> getPacientes() {
        return this.pacientes;
    }

    public void setPacientes(Set<Paciente> pacientes) {
        this.pacientes = pacientes;
    }

}