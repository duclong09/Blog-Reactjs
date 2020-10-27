import React, { Component } from 'react';
class Auth extends Component {
    state = {
        controls: {
            email: {
                value: '',
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                }
            },
            password: {
                value: '',
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                }
            }
        }
    }
    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        const form = formElementsArray.map(formElement => {
            if (formElement.elementType === 'input') {
                <input
                    // object nhieu key truyen het vao
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed} />;
            }
            if(formElement.elementType === 'password'){
                
            }
        })
        return (
            <div>
                <form>
                    {form}
                    <button className='btn btn-success'>Send</button>
                </form>
            </div>
        )
    }
}
export default Auth;