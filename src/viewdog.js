

const Dog = ({ setView, dog, setDog, }) => {

  return (
    <div className="viewDog" >

      <img className='bild' id="img" alt="dog" src={dog.img} />
      <p>Name:{dog.name} </p>
      <p>Age: {dog.age} </p>
      <p>Bio:{dog.bio} </p>
      <p>Present: {dog.present ? "Yes" : "No"} , </p>
      <p>friends:  {dog.friends?.map(friend => (<span onClick={() => setDog(friend)}>{friend.name},</span>))} </p>



      <button className="button" onClick={() => setView("DOGS")}>Home</button>

      <button className="button" onClick={() => setView("EDIT")}>edit</button>
    </div>
  )
}

export default Dog
