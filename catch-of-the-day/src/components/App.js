import React from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'
import base from '../base'

class App extends React.Component {
  constructor() {
    super()
    //get initial state
    this.state = {
      fishes: {},
      order: {}
    }
  }

  //this runs right before the <app> is rendered
  componentWillMount = () => {
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`
      , {
        context: this,
        state: 'fishes',
      })

    //check if there is  any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`)
    if (localStorageRef) {
      //update our app component's order state
      this.setState({
        //transform string to object
        order: JSON.parse(localStorageRef)
      })
    }
  }

  componentWillUnmount = () => {
    base.removeBinding(this.ref)
  }

  componentWillUpdate = (nextProps, nextState) => {
    //transform object to string
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order))
  }


  addFish = (fish) => {
    const fishes = { ...this.state.fishes }
    const timestamp = Date.now()
    fishes[`fish-${timestamp}`] = fish  //create new fish
    this.setState({ fishes })
  }

  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes }
    fishes[key] = updatedFish
    this.setState({ fishes })
  }

  removeFish = (key) => {
    const fishes = { ...this.state.fishes }
    fishes[key] = null
    this.setState({ fishes })
  }

  loadSamples = () => {
    this.setState({
      fishes: sampleFishes
    })
  }

  //https://courses.wesbos.com/account/access/5a1e0fc9696e87663e8399c8/view/184585398
  addToOrder = (key) => {
    //take a copy of our state
    const order = { ...this.state.order }
    order[key] = order[key] + 1 || 1
    this.setState({ order })
  }

  removeFromOrder = (key) => {
    const order = { ...this.state.order }
    delete order[key]
    this.setState({ order })
  }

  render() {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Fresh Seafood Market' />
          <ul className='list-of-fishes'>
            {
              // https://courses.wesbos.com/account/access/5a1e0fc9696e87663e8399c8/view/184585397
              Object
                .keys(this.state.fishes)
                .map(key => <Fish addToOrder={this.addToOrder}
                  key={key} index={key} details={this.state.fishes[key]} />)
            }
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          loadSamples={this.loadSamples}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
          storeId={this.props.params.storeId}
        />
      </div>

    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App
