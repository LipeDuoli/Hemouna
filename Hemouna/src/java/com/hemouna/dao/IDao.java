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
    public boolean excluir(Object obj);
    public List<Object> getId(int id);
    public List<Object>listarTodos();
}
