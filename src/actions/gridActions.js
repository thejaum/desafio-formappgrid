import dispatcher from "../dispatcher";

export function addRow(row){
    dispatcher.dispatch({
       type: "ADD_ROW",
       row: row,
    });
}

export function removeRow(idx){
    dispatcher.dispatch({
       type: "REMOVE_ROW",
       idx: idx,
    });
}

export function editRow(idx){
    dispatcher.dispatch({
       type: "EDIT_ROW",
       idx: idx,
    });
}

export function editValuesRow(row){
    dispatcher.dispatch({
       type: "EDIT_VALUES_ROW",
       row: row,
    });
}