export function addSponsor(sponsor){

  return (dispatch) => {
    fetch('http://localhost:3000/sponsors', {
      headers: {"Content-Type": "application/json",
      "Accept":"application/json"},
      method: "POST",
      body: JSON.stringify({
        username: sponsor.username,
        password: sponsor.password,
        age: sponsor.age,
        gender: sponsor.gender,
        bio: sponsor.bio,
        email: sponsor.email,
        street: sponsor.street,
        city: sponsor.city,
        state: sponsor.state,
        zip: sponsor.zip
      })
    })
    .then(res => res.json())
    .then(json => {
      if (json.sponsor === undefined){
        dispatch(renderSignUpError({error: "invalid signup"}))
      } else{
        dispatch(renderAddSponsor(json))
      }
    })
  }
}

export function renderSignUpError(data){

    return {
      type: "RENDER_ADD_SPONSOR_FAILED",
      payload: data
    }
}

export function renderAddSponsor(data){
  return {
    type: "RENDER_ADD_SPONSOR",
    payload: data
  }
}

export function loginSponsor(sponsor){
  debugger
  return (dispatch) => {
    fetch('http://localhost:3000/sponsor/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
      body: JSON.stringify({username: sponsor.username, password: sponsor.password})
    }).then(res => res.json())
      .then(json => {
        if (json.sponsor === undefined){
          dispatch(sponsorLoginError({error: "invalid login"}))
        } else{
          dispatch({
            type: "LOGIN_SPONSOR",
            payload: json
          })
        }
      })
  }
}

export function sponsorLoginError(data){
  return {
    type: "LOGIN_SPONSOR_FAILED",
    payload: data
  }
}

export function removeSponsorError(){
  return{
    type: "REMOVE_SPONSOR_ERROR",
    payload: ""
  }
}

export function getCurrentSponsorRole(data){
  return{
    type: "GET_CURRENT_SPONSOR_ROLE",
    payload: data
  }
}

export function setSponsorLocal(data){
  if (data.sponsor === undefined){
    return null
  } else{
    return {
      type: "LOGIN_SPONSOR",
      payload: data
    }
  }
}

export function removeSponsorLogin(data){
  return {
    type: "REMOVE_SPONSOR_LOGIN",
    payload: data
  }
}

export function deleteSponsorAccount(data){
  debugger
  return (dispatch) => {
    fetch(`http://localhost:3000/sponsors/${data.id}`, {
        headers: {"Content-Type": "application/json",
        "Accept":"application/json"},
        method: "DELETE",
        body: JSON.stringify({
          id: data.id
        })
      })
    .then(() => dispatch(sendDeleteData(data)))
  }
}

export function sendDeleteData(data){
  debugger
  return {
    type: "DELETE_SPONSOR_ACCOUNT",
    payload: data
  }
}

export function fetchSponsorsRequest(){
  return (dispatch) => {
    fetch('http://localhost:3000/sponsors')
    .then(res => res.json())
    .then(json => dispatch(fetchSponsorsRequestResolved(json)))
  }
}

export function fetchSponsorsRequestResolved(data){
  return {
    type: "RENDER_SPONSORS",
    payload: data
  }
}

export function editSponsor(data){
  debugger
  return (dispatch) =>{
    fetch(`http://localhost:3000/sponsors/${data.id}`, {
        headers: {"Content-Type": "application/json",
        "Accept":"application/json"},
        method: "POST",
        body: JSON.stringify({
          id: data.id,
          username: data.username,
          password: data.password,
          age: data.age,
          gender: data.gender,
          bio: data.bio,
          email: data.email,
          street: data.street,
          city: data.city,
          state: data.state,
          zip: data.zip
        })
      })
    .then(res => res.json())
    .then(json => dispatch(submitEditSponsor(json)))
  }
}

export function submitEditSponsor(data){
  debugger
  return{
    type: "SUBMIT_EDIT_SPONSOR",
    payload: data
  }
}
