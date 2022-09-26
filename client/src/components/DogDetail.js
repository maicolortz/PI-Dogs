import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { getDogDetail } from '../redux/actions';
import dogdefault from '../../src/images/perro.png'
 const DogDetail = ({getDogDetail,dogDetail}) => {
  const params=useParams();

  useEffect(()=>{
    getDogDetail(params.id);
  },[params])
  return (
    <>
    <form className="formdetail"method="get" action="/home">
        <button className="b-detail" type="submit">
          Back
        </button>
      </form>
    <div className='container'>
      
       {dogDetail &&
       dogDetail.map((dog)=>(
        <div className='cardDetail'>

        <h1>{dog.name}</h1>
        <img className="imgcard" src={dog.image?dog.image:dogdefault} alt={dog.name}></img>
        <span>
        {" "}
       <strong>Weight :</strong>  <br/>
        Imperial :{dog.weight.imperial}<br/>
        Metric : {dog.weight.metric}<br/><br/>
        <strong>Height : </strong><br/>
        Imperial :{dog.height.imperial}<br/>
        Metric : {dog.height.metric}<br/><br/>
        <strong>Life Span :</strong>{dog.life_span} YEARS<br/><br/><br/>
        <strong>Temperaments:</strong><br/>
        {dog.temperament?dog.temperament:dog.temperaments[0].name}<br/>
      </span>
        </div>
       ))}
    </div>
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