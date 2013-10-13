/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.hemouna.dao;

import java.util.List;

/**
 *
 * @author Fillipe
 */
public interface IDao {
    public boolean salvar(Object obj);
    public boolean alterar(Object obj);
    public boolean excluir(Integer id);
    public Object getTarefa(Integer id);
    public List<Object>pesquisar(String argumento);
}
