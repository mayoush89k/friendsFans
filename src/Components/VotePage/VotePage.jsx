import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import "./VotePage.css";
import axios from "axios";
import Spinner from "../Spinner/Spinner";

export default function VotePage() {
  const { theme } = useTheme();
  const [characters, setCharacters] = useState([]);
  const [currentVote, setCurrentVote] = useState(0);
  const [checking, setChecking] = useState(false);
  const usersUrl = "https://6571e97ed61ba6fcc013f0b6.mockapi.io/users";
  const charactersUrl =
    "https://6571e97ed61ba6fcc013f0b6.mockapi.io/Charactors";
  const [isVoted, setIsVoted] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    fetchFriendsCharacters();
    console.log(characters)
  }, [isVoted, user]);

  const fetchFriendsCharacters = async () => {
    try {
      const data = await axios.get(charactersUrl);
      setCharacters(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchUpdateCharacter = async (character, key , currentVote) => {
    // const currentVote = character.votes+1
    // setCurrentVote(character.votes++);
    try {
      const data = await axios.put(charactersUrl + "/" + character.id, {
        ...character,
        [key]: currentVote,
      });
      console.log(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSubmitVote = async (user, result) => {
    console.log("user: ", user);
    try {
      const data = await axios.put(usersUrl + "/" + user.id, {
        ...user,
        voted: result,
      });
      localStorage.setItem("user", JSON.stringify(data.data));
      setUser(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const submitVote = async () => {
    await fetchSubmitVote(user, true);
  };

  const changeVote = (character) => {
    setIsVoted(
      isVoted.map((VotedCharacter, index) =>
        character.id == index + 1 ? !VotedCharacter : VotedCharacter
      )
    );
  };
  const handleSubmit = (character) => {
    fetchUpdateCharacter(character, "votes" , character.votes+1);
    submitVote();
    setChecking(true);
    setTimeout(() => {
      changeVote(character);
    }, 2000);
  };

  const handleChangeVote = (user , character) => {
    setChecking(true)
    fetchSubmitVote(user, false);
    fetchUpdateCharacter(character, "votes" , character.votes-1)
    setTimeout(() => {
      setChecking(false)
    },2000)

  }
  return (
    <div className={theme ? "pages-light" : "pages-dark"} id="VotePage">
      <div id="characters-list">
        {characters.map((character) => (
          <div className="character" key={character.id}>
            <img src={character.avatar} alt={character.name} />
            <h1>{character.name}</h1>
            <p>Votes: {character.votes}</p>
            {user.voted ? (
              <button onClick={() => handleChangeVote(user, character)}>
                Change your vote
              </button>
            ) : isVoted[character.id -1 ] ? (
              <div>
                <button onClick={() => handleSubmit(character)}>submit</button>{" "}
                <button onClick={() => changeVote(character)}>cancel</button>
              </div>
            ) : (
              <button onClick={() => changeVote(character)}>Vote</button>
            )}
          </div>
        ))}
        {checking && (
          <div className="spinner">
            <Spinner />
            {setTimeout(() => {
              setChecking(false);
            }, 2000)}
          </div>
        )}
      </div>
    </div>
  );
}
