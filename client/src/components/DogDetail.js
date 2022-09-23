import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { getDogDetail } from '../redux/actions';

 const DogDetail = ({getDogDetail,dogDetail}) => {
  const params=useParams();

  useEffect(()=>{
    getDogDetail(params.id);
  },[params])
  return (
    <>
       {dogDetail &&
       dogDetail.map((dog)=>(
        <div className='card'>

        <h1>{dog.name}</h1>
        <img className="imgcard" src={dog.image} alt={dog.name}></img>
        </div>
       ))}
    </>
  )
}

function mapStateToProps(state) {
  return {
  dogDetail:state.dogDetail,
}}

function mapDispatchToProps(dispatch) {
  return {
    getDogDetail: (name) => dispatch(getDogDetail(name)),
}
}

export default connect(mapStateToProps, mapDispatchToProps)(DogDetail)