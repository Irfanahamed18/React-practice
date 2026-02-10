import { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const [profile, setProfile] = useState(null);

  const[followers,setFollowers] =useState([]);

  const[unfollowed,setUnfollowed] =useState(0);

  useEffect(() => {
  axios
    .get("http://localhost:3000/profile")
    .then((res) => {
      setProfile(res.data);
      console.log(res);
    })
    .catch((err) => console.log(err));

  axios
    .get("http://localhost:3000/followers")
    .then((res) => {
      setFollowers(res.data);
      console.log(res);
    })
    .catch((err) => console.log(err));
}, [unfollowed]);


  function Handleonchange(e){
    setProfile(prev =>({
        ...prev,
        [e.target.name]: e.target.value
    }))
  }

    const Handleupdate = async ()=>{
     axios.put("http://localhost:3000/profile",profile)
     .then(console.log("Updated"))
     .catch(err =>console.log(err))
  }
  const HandleDelete = async (id)=>{
     axios.delete(`http://localhost:3000/followers/${id}`)
     .then(alert("UnFollowed"))
     .then(setUnfollowed(!unfollowed))
     .catch(err =>console.log(err))
  }

  return (
    <div className="m-5">
      {profile ? (
        <div>
          <img src={profile.profile_pic} className="profile rounded-circle" />
          <h5>{profile.username}</h5>
          <input
            type="text"
            value={profile.username}
            name="username"
            className="form-control my-4"
            onChange={Handleonchange}
          />

          <input
            type="text"
            name="profile_pic"
            value={profile.profile_pic}
            className="form-control"
            onChange={Handleonchange}
          />
          <button className="btn btn-primary my-4" onClick={Handleupdate}>
            Update
          </button>
        </div>
      ) : (
        <div>Loading Profile</div>
      )}

          {followers.length > 0 ? (
      followers.map((follower) => (
        <div key={follower.id} className="d-flex my-2">
          {follower.username}
          <button className="btn btn-secondary ms-auto" onClick={()=>{HandleDelete(follower.id)}}>Un Follow</button>
        </div>
      ))
    ) : (
      <div>Loading Followers</div>
    )}

    </div>
  );
}

export default Profile;
