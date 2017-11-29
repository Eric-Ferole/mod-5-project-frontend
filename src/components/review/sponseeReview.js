import React, { Component } from 'react'
import { Form, Button, Dropdown, Icon } from 'semantic-ui-react'
import { addSponseeReview } from '../../actions/reviewActions'
import { connect } from 'react-redux'
import { getCurrentSponsee, removeCurrentSponsee } from '../../actions/sponseeActions'

class SponseeReview extends Component {

  state = {
    rating: 1,
    body: "",
    facility_id: ""
  }

  componentDidMount = () => {
    debugger
    const username = localStorage.getItem("username")
    this.props.getCurrentSponsee(username)
  }

  handleOnChange = (event) => {

    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleDropChange = (event) => {
    debugger
    //debugger
    this.setState({
      rating: parseInt(event.target.innerText)
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const sponseeReview = {sponsee_id: this.props.currentSponsee.id, rating: this.state.rating, body: this.state.body, facility_id: this.props.facilityId}
    this.props.addSponseeReview(sponseeReview)
    this.props.reviewClicked()
    
  }

  render(){

    const options = [{
      'key': 1,
      'text': 1,
      'value': 1,
      'content': 1
    },
    {
      'key': 2,
      'text': 2,
      'value': 2,
      'content': 2
    },
    {
      'key': 3,
      'text': 3,
      'value': 3,
      'content': 3
    },
    {
      'key': 4,
      'text': 4,
      'value': 4,
      'content': 4
    },
    {
      'key': 5,
      'text': 5,
      'value': 5,
      'content': 5
    }]

    return(

      <div className="sponsorReview">

        <Form className="sponsorReviewForm" onSubmit={this.handleSubmit}>
          <Icon className="close" size="large" style={{color: 'red', marginLeft: '95%'}}onClick={this.props.reviewClicked}/>
        <h3>{localStorage.getItem("username")}'s Review</h3>
        <Form.Field className="dropDownReview" required>
  rating: <Dropdown inline header='Rating' options={options} defaultValue="rating" value={this.state.rating} onChange={this.handleDropChange}/>
        </Form.Field>
      <Form.TextArea className="reviewTextArea" placeholder="write a review" name="body" type="text" value={this.state.body} onChange={this.handleOnChange} required>
        </Form.TextArea>
        <Button className="submitButton" type='submit'>Submit</Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentSponsor: state.sponsorsReducer.sponsor,
    currentSponsee: state.sponseesReducer.sponsee,
    sponsees: state.sponseesReducer.sponsees,
    sponsors: state.sponsorsReducer.sponsors,
    currentPosition: state.currentReducer.currentPosition
  }
}

export default connect(mapStateToProps, { addSponseeReview, getCurrentSponsee, removeCurrentSponsee })(SponseeReview)
