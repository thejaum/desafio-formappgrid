import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import UniqueId from 'react-html-id';

class GridStore extends EventEmitter{
    constructor(){
        super();
        UniqueId.enableUniqueIds(this);
        this.rows = [];
    }

    addRow(row){
        console.log("addRow");
        this.rows.push(row)
        this.emit("add");
    }

    removeRow(idx){
        console.log("Removing "+idx);
        const rowsAss = [];
        this.rows.forEach(i =>{
            if(i.id !== idx){
                rowsAss.push(i);
            }
        })
        this.rows = rowsAss;
        this.emit("add");
    }

    editRow(idx){
        this.emit("edit",idx);
    }

    editValuesRow(row){
        console.log("editValuesRow");
        this.rows[row.id] = row;
        this.emit("add");
    }

    getAll(){
        const rowsAss = Object.assign([],this.rows);
        rowsAss.map((i,index) => {       
            i.id = index;
            return null; 
        })
        this.rows = rowsAss;
        return this.rows;
    }

    handleActions(action){
        // console.log("TodoStore received an action", action);
        // console.log("Type : "+action.type)
        switch(action.type){
            case "ADD_ROW":{
                this.addRow(action.row);
                break;
            }
            case "REMOVE_ROW":{
                this.removeRow(action.idx);
                break;
            }
            case "EDIT_ROW":{
                this.editRow(action.idx);
                break;
            }
            case "EDIT_VALUES_ROW":{
                this.editValuesRow(action.row);
                break;
            }
            default :{
                break;
            }
        }
    }
}

const gridStore = new GridStore();
dispatcher.register(gridStore.handleActions.bind(gridStore));
window.gridStore = gridStore;
export default gridStore;