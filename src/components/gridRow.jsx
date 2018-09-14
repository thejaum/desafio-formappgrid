import React from "react";

class GridRow extends React.Component {

    render(){
        return(
            <tr id={this.props.id}>
                <td>{this.props.name}</td>
                <td>{this.props.nickname}</td>
                <td className="actions"><span onClick={this.props.edit}>[!]</span><span onClick={this.props.remove}>X</span></td>
            </tr>
        )
    }
}

export default GridRow 