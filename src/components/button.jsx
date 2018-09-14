import React from 'react'


class Button extends React.Component {
    render(){
        return(
            <div className={this.props.clsName}>
                <button type="button" value={this.props.value} onClick={this.props.click}>{this.props.value}</button>
            </div>
        )
    }
}

export default Button;