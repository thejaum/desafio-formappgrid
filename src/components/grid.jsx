import React from "react";
import UniqueId from 'react-html-id';
import Button from "./button";
import * as GridActions from "../actions/gridActions";
import GridStore from '../store/gridStore'
import GridRow from "./gridRow"

class Grid extends React.Component {
    constructor(){
        super();
        UniqueId.enableUniqueIds(this);
        this.state = {
            rows : GridStore.getAll(),
            add : true,
            edit : false
        }
    }

    componentWillMount(){
        GridStore.on("add", () => {
            this.setState({
                rows: GridStore.getAll(),
            });
        });
        GridStore.on("edit", (idx) => {
            this.setState({
                add: false,
                edit: true,
            });
            console.log("Edit "+idx)
            this.state.rows.forEach(i =>{
                if(i.id === idx){
                    document.getElementById('select').value = i.id;
                    document.getElementById('nickname').value = i.nickname;
                    document.getElementById('name').value = i.name;
                }
            })
        });
    }

    addNewRow(){
        let newRow = {'name': document.getElementById('name').value,
        'nickname': document.getElementById('nickname').value};
        GridActions.addRow(newRow);
        document.getElementById('nickname').value = "";
        document.getElementById('name').value = ""
    }

    removeRow = (idx) => {
        console.log("Exclude id "+idx);
        this.state.add ? GridActions.removeRow(idx) : console.log('Não é possivel remover enquanto estiver alterando.');
    }

    editRow = (idx) => {
        console.log("Edit id "+idx);
        this.state.add ? GridActions.editRow(idx) : console.log('Termine de alterar o item atual antes de editar um outro.');
    }

    altRow = (idx) => {
        console.log("Alt id "+ document.getElementById('select').value);
        let editRow = {'id': Number(document.getElementById('select').value),
        'name': document.getElementById('name').value,
        'nickname': document.getElementById('nickname').value};
        GridActions.editValuesRow(editRow);
        document.getElementById('nickname').value = "";
        document.getElementById('name').value = "";
        this.setState({
            add: true,
            edit: false,
        });
    }

    render(){
        return(
            <div className="container">
                <input id='select' type='hidden'/>
                <label>Nome</label>
                <input id='name' type='text'/>
                <label>Sobre Nome</label>
                <input id='nickname' type='text'/>
                
                {this.state.add ? 
                <Button
                    clsName="btn-add"
                    value= "Adicionar"
                    click={this.addNewRow.bind(this)}
                />
                : null}

                {this.state.edit ? 
                <Button
                    clsName="btn-edit"
                    value= "Alterar"
                    click={this.altRow.bind(this)}
                />
                : null}

                <table>
                    <thead>
                        <tr>
                            <td>Nome</td>
                            <td>Sobrenome</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.rows.map((i,index) => {
                                return(
                                    <GridRow
                                        name = {i.name}
                                        nickname = {i.nickname}
                                        remove = {this.removeRow.bind(this,index)}
                                        edit = {this.editRow.bind(this,index)}
                                        key = {index}
                                        id = {index}
                                    />
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Grid;