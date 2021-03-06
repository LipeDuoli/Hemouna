package com.hemouna.entidade;
// Generated 28/10/2013 09:47:21 by Hibernate Tools 3.6.0

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Tipobolsa generated by hbm2java
 */
@Entity
@Table(name = "tipobolsa", catalog = "hemounadb"
)
public class Tipobolsa implements java.io.Serializable {

    private Integer id;
    private String nomebolsa;

    public Tipobolsa() {
    }

    public Tipobolsa(String nomebolsa) {
        this.nomebolsa = nomebolsa;
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

    @Column(name = "nomebolsa", nullable = false, length = 25)
    public String getNomebolsa() {
        return this.nomebolsa;
    }

    public void setNomebolsa(String nomebolsa) {
        this.nomebolsa = nomebolsa;
    }

}
