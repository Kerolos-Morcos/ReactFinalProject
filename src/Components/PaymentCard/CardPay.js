import React from 'react'
import { render } from 'react-dom'
import Card from 'react-credit-cards'
import CardPayStyle from './cardpay.module.css'

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from './utils'

import 'react-credit-cards/es/styles-compiled.css'

 export default class CardPay extends React.Component {
  state = {
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
    formData: null,
    
  }
  
  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer })
    }
  }
  
  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name
    })
  }
  
  handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value)
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value)
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value)
    }

    this.setState({ [target.name]: target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    alert('You have finished payment!')
    this.form.reset()
  }
  
  render () {
    const { name, number, expiry, cvc, focused, issuer } = this.state
    
    return (
      <div key='Payment' className={CardPayStyle.PaymentCard}>
        <div className={`${CardPayStyle['App-payment']}`}>
          <h1>ادخل تفاصيل الدفع</h1>
          <Card

            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
          />
          <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
            <div className={`${'form-group'} ${CardPayStyle['form_group']}`}>
              <small>الاسم المطبوع علي بطاقة الدفع</small>
              <input
                type='text'
                name='name'
                className={`${'form-control'} ${CardPayStyle['form_control']}`}
                placeholder='Name'
                pattern='[a-z A-Z-]+'
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className={`${'form-group'} ${CardPayStyle['form_group']}`}>
              <small>رقم البطاقة </small>

              <input
                type='tel'
                name='number'
                className={`${'form-control'} ${CardPayStyle['form_control']}`}
                placeholder='Card Number'
                pattern='[\d| ]{16,22}'
                maxLength='19'
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>

            <div className={`${'form-group'} ${CardPayStyle['form_group']}`}>
              <small>تاريخ الصلاحية</small>

              <input
                type='tel'
                name='expiry'
                className={`${'form-control'} ${CardPayStyle['form_control']}`}
                placeholder='Valid Thru'
                pattern='\d\d/\d\d'
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className={`${'form-group'} ${CardPayStyle['form_group']}`}>
              <small>CVC</small>

              <input
                type='tel'
                name='cvc'
                className={`${'form-control'} ${CardPayStyle['form_control']}`}
                placeholder='CVC'
                pattern='\d{3}'
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <input type='hidden' name='issuer' value={issuer} />
          </form>
        </div>
      </div>
    )
  }
}


const storedDarkMode = JSON.parse(localStorage.getItem("isDarkMode"));
{storedDarkMode &&
  render(<CardPay />, document.getElementById('root'))
}

