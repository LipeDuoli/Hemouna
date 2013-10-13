package com.hemouna.entidade;
// Generated 13/10/2013 18:18:00 by Hibernate Tools 3.2.1.GA


import java.util.HashSet;
import java.util.Set;

/**
 * Hospital generated by hbm2java
 */
public class Hospital  implements java.io.Serializable {


     private Integer id;
     private String nomehosp;
     private Set pacientes = new HashSet(0);
     private Set bolsadesangues = new HashSet(0);
     private Set usuarioses = new HashSet(0);

    public Hospital() {
    }

	
    public Hospital(String nomehosp) {
        this.nomehosp = nomehosp;
    }
    public Hospital(String nomehosp, Set pacientes, Set bolsadesangues, Set usuarioses) {
       this.nomehosp = nomehosp;
       this.pacientes = pacientes;
       this.bolsadesangues = bolsadesangues;
       this.usuarioses = usuarioses;
    }
   
    public Integer getId() {
        return this.id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    public String getNomehosp() {
        return this.nomehosp;
    }
    
    public void setNomehosp(String nomehosp) {
        this.nomehosp = nomehosp;
    }
    public Set getPacientes() {
        return this.pacientes;
    }
    
    public void setPacientes(Set pacientes) {
        this.pacientes = pacientes;
    }
    public Set getBolsadesangues() {
        return this.bolsadesangues;
    }
    
    public void setBolsadesangues(Set bolsadesangues) {
        this.bolsadesangues = bolsadesangues;
    }
    public Set getUsuarioses() {
        return this.usuarioses;
    }
    
    public void setUsuarioses(Set usuarioses) {
        this.usuarioses = usuarioses;
    }




}


