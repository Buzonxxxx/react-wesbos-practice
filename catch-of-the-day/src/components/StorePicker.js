import React from 'react';
import { getFunName } from './helpers'

class StorePicker extends React.Component {
  goToStore = (event) => {
    event.preventDefault()
    console.log('You changed the URL')
    //get storeInput from user input
    console.log(this.storeInput)
    //get store name from storeInput.value
    const storeId = this.storeInput.value
    console.log(`Going to ${storeId}`)
    this.context.router.transitionTo(`/store/:${storeId}`)
  }
  render() {
    return (
      <form className='store-selector' onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input type='text' required placeholder='Store Name'
          defaultValue={getFunName()} ref={(input) => { this.storeInput = input }} />
        <button type='submit'>Visit Store</button>
      </form>
    )
  }
}
//Ref: https://courses.wesbos.com/account/access/5a1e0fc9696e87663e8399c8/view/184581844
StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;