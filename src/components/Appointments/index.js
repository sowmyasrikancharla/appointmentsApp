import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentsList: [],
    isStarredButton: 'inActive',
  }

  updateTitle = event => {
    const title = event.target.value
    this.setState({title})
  }

  updateDate = event => {
    const date = event.target.value
    this.setState({date})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date, appointmentsList} = this.state

    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }

    console.log(newAppointment)

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  toggleLikeButton = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onClickStarred = () => {
    const {appointmentsList, isStarredButton} = this.state
    if (isStarredButton !== 'inActive') {
      this.setState({isStarredButton: 'inActive'})
    } else {
      this.setState({isStarredButton: 'Active'})

      console.log(isStarredButton)
    }
    return appointmentsList
  }

  displayAppointments = () => {
    const {appointmentsList, isStarredButton} = this.state
    if (isStarredButton === 'inActive') {
      return appointmentsList.map(eachAppointment => (
        <AppointmentItem
          key={eachAppointment.id}
          appointmentDetails={eachAppointment}
          toggleLikeButton={this.toggleLikeButton}
        />
      ))
    }
    const filteredAppointments = appointmentsList.filter(
      eachAppointment => eachAppointment.isStarred === true,
    )
    console.log(filteredAppointments)
    return filteredAppointments.map(eachAppointment => (
      <AppointmentItem
        key={eachAppointment.id}
        appointmentDetails={eachAppointment}
        toggleLikeButton={this.toggleLikeButton}
      />
    ))
  }

  render() {
    const {title, date, appointmentsList} = this.state
    return (
      <div className="main-con">
        <div className="sub-con">
          <h1 className="head">Add Appointment</h1>
          <div className="flex-con">
            <form onSubmit={this.onAddAppointment}>
              <label htmlFor="titlee" className="label">
                TITLE
              </label>
              <br />
              <input
                className="inp"
                id="titlee"
                type="text"
                placeholder="Title"
                value={title}
                onChange={this.updateTitle}
              />
              <br />
              <label htmlFor="datee" className="label">
                DATE
              </label>
              <br />
              <input
                className="inp"
                id="datee"
                type="date"
                value={date}
                onChange={this.updateDate}
              />
              <br />
              <button className="but" type="submit">
                Add
              </button>
            </form>
            <div className="right-con">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr className="line" />
          <div className="starred-button-con">
            <h2 className="head">Appointments</h2>
            <button className="starred-button" onClick={this.onClickStarred}>
              starred
            </button>
          </div>
          <ul className="app-con">{this.displayAppointments()}</ul>
        </div>
      </div>
    )
  }
}
export default Appointments
