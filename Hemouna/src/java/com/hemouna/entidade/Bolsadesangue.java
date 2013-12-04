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
 * Bolsadesangue generated by hbm2java
 */
@Entity
@Table(name = "bolsadesangue", catalog = "hemounadb"
)
public class Bolsadesangue implements java.io.Serializable {

    private Integer id;
    private Paciente paciente;
    private Tiposangue tiposangue;
    private Tipobolsa tipobolsa;
    private Hospital hospital;
    private String numero;
    private String validade;
    private String datasaida;

    public Bolsadesangue() {
    }
    
    public Bolsadesangue(Integer id) {
        this.id = id;
    }

    public Bolsadesangue(Tiposangue tiposangue, Tipobolsa tipobolsa, Hospital hospital, String validade, String numero) {
        this.tiposangue = tiposangue;
        this.tipobolsa = tipobolsa;
        this.hospital = hospital;
        this.validade = validade;
        this.numero = numero;
    }

    public Bolsadesangue(Paciente paciente, Tiposangue tiposangue, Tipobolsa tipobolsa, Hospital hospital, String validade, String datasaida, String numero) {
        this.paciente = paciente;
        this.tiposangue = tiposangue;
        this.tipobolsa = tipobolsa;
        this.hospital = hospital;
        this.validade = validade;
        this.datasaida = datasaida;
        this.numero = numero;
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
    @JoinColumn(name = "paciente_id", nullable = true)
    public Paciente getPaciente() {
        return this.paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
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
    @JoinColumn(name = "tipobolsa_id", nullable = false)
    public Tipobolsa getTipobolsa() {
        return this.tipobolsa;
    }

    public void setTipobolsa(Tipobolsa tipobolsa) {
        this.tipobolsa = tipobolsa;
    }

    @ManyToOne
    @JoinColumn(name = "hospital_id", nullable = false)
    public Hospital getHospital() {
        return this.hospital;
    }

    public void setHospital(Hospital hospital) {
        this.hospital = hospital;
    }

    @Column(name = "validade", nullable = false, length = 10)
    public String getValidade() {
        return this.validade;
    }

    public void setValidade(String validade) {
        this.validade = validade;
    }

    @Column(name = "numero", nullable = false, length = 15)
    public String getNumero() {
        return this.numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    @Column(name = "datasaida", length = 10)
    public String getDatasaida() {
        return this.datasaida;
    }

    public void setDatasaida(String datasaida) {
        this.datasaida = datasaida;
    }

}
