// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import './index.css'

class AppointmentItem extends Component {
  render() {
    const {appointmentDetails, toggleLikeButton} = this.props
    const {title, date, id, isStarred} = appointmentDetails
    const d = date.toString()
    const y = d.slice(0, 4)
    const m = d.slice(5, 7)
    const day = d.slice(8, 10)
    const dateFormat = format(new Date(y, m - 1, day), 'dd MMMM yyyy, EEEE')

    const likeImage = isStarred
      ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

    const onClickLike = () => {
      console.log(id)
      toggleLikeButton(id)
    }

    return (
      <li className="single-appointment">
        <div>
          <p className="head1">{title}</p>
          <p className="date">Date: {dateFormat}</p>
        </div>

        <button onClick={onClickLike} className="no-bg" data-testid="star">
          <img src={likeImage} className="star" alt="star" />.
        </button>
      </li>
    )
  }
}
export default AppointmentItem
