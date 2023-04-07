import { useState, useEffect } from "react";

const CreateDog = ({ setView, setDogs, dogs, dog }) => {
  const [present, setPresent] = useState(false);
  const [friends, setFriends] = useState([]);
  const [randomDog, setDogImg] = useState("");

  useEffect(() => {
    fetchDog();
  }, []);

  const fetchDog = async () => {
    const resp = await fetch("https://dog.ceo/api/breeds/image/random");
    const randomDog = await resp.json();
    setDogImg(randomDog.message);
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setPresent(isChecked);
  };

  const addAsFriend = (event) => {
    const friendId = event.target.value;
    const foundDog = dogs.find((currentDog) => {
      return currentDog.id === friendId;
    });
    if (foundDog) {
      setFriends([...friends, foundDog]);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const img = randomDog;
    const name = event.target.name.value;
    const age = event.target.age.value;
    const bio = event.target.bio.value;

    setDogs(prev => [...prev, { name, age, img, friends, present, bio, id: `${name}${dogs.length + 1}` }]); // ny hund läggs till
    setView("DOGS"); // byt vy till DOGS
    setPresent(false); // reset present state
    setFriends([]); // reset friends state
    setDogImg(""); // reset dog image state
  };

  const friendsIds = friends.map((friend) => friend.id);

  return (
    <div>
      <h1>Aylins DogCenter</h1>
      <h3 className="h3">Create your dog here:</h3>
      <form onSubmit={submitHandler}>
        <img className="bild" id="img" alt="dog" src={randomDog} />
        <button type="button" onClick={fetchDog}>
          Change
        </button>

        <strong>Name:</strong>
        <input placeholder="name" id="name" type="text" />
        <strong>Age:</strong>
        <input placeholder="age" id="age" type="number" />
        <strong>Bio:</strong>
        <input placeholder="Bio" id="bio" type="text" />

        <label>
          Present:
          <input
            value={present}
            id="present"
            type="checkbox"
            onChange={handleCheckboxChange}
          />
        </label>
        {present ? (
          <div>
            <p1>Now present</p1>
          </div>
        ) : (
          <div>
            <p2>NOT present</p2>
          </div>
        )}

        <p>
          Friends:{" "}
          {friends.map((friend) => (
            <span>{friend.name},</span>
          ))}{" "}
        </p>
        <select onChange={addAsFriend}>
          <option>None</option>
          {dogs
            .filter((d) => !friendsIds.includes(d.id))
            .map((dogInList, i) => (
              <option key={i} value={dogInList.id}>
                {dogInList.name}
              </option>
            ))}
        </select>

        <button className="button">Save</button>


      </form>
    </div>
  )
}


export default CreateDog

