import { useEffect, useState } from "react";
import axios from "axios";

export function GitHub() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    axios.get("https://api.github.com/users/og-tanim").then(async (res) => {
      await new Promise((r) => {
        setTimeout(r, 3000);
      });
      console.log(res.data);
      setProfile(res.data);
    });
  }, []);

  const obj = {
    avatar_url: "https://avatars.githubusercontent.com/u/161076819?v=4",
    url: "https://api.github.com/users/OG-Tanim",
    html_url: "https://github.com/OG-Tanim",
    events_url: "https://api.github.com/users/OG-Tanim/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/OG-Tanim/received_events",
    type: "User",
    user_view_type: "public",
    site_admin: false,
    name: "Tanim Ahmed",
    company: null,
    blog: "",
    location: "Dhaka, Bangladesh",

    twitter_username: "OG_Tanim",
    public_repos: 13,
    public_gists: 0,
    followers: 0,
    following: 4,
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "30px",
        backgroundColor: "#ffffff",
        borderRadius: "15px",
        boxShadow: "0 10px 30px rgb(0, 0, 0)",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <img
        src={profile.avatar_url}
        alt="avatar"
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          border: "4px solid #ff9900",
          marginBottom: "20px",
          objectFit: "cover",
        }}
      />
      <h2
        style={{
          margin: "0 0 10px 0",
          color: "#24292e",
          fontSize: "24px",
          fontWeight: "700",
        }}
      >
        {profile.name}
      </h2>
      <p
        style={{
          margin: "0 0 25px 0",
          color: "#586069",
          fontSize: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        📍 {profile.location}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          borderTop: "1px solid #e1e4e8",
          paddingTop: "20px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "0px 20px 0px 20px",
          }}
        >
          <h3
            style={{
              margin: "0 0 5px 0",
              color: "#000000",
              fontSize: "24px",
              fontWeight: "700",
            }}
          >
            {profile.followers}
          </h3>
          <p
            style={{
              margin: "0",
              color: "#586069",
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Followers
          </p>
        </div>
        <div
          style={{
            textAlign: "center",
            padding: "0px 20px 0px 20px",
          }}
        >
          <h3
            style={{
              margin: "0 0 5px 0",
              color: "#000000",
              fontSize: "24px",
              fontWeight: "700",
            }}
          >
            {profile.following}
          </h3>
          <p
            style={{
              margin: "0",
              color: "#586069",
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Following
          </p>
        </div>
        <div
          style={{
            textAlign: "center",
            padding: "0px 20px 0px 20px",
          }}
        >
          <h3
            style={{
              margin: "0 0 5px 0",
              color: "#000000",
              fontSize: "24px",
              fontWeight: "700",
            }}
          >
            {profile.public_repos}
          </h3>
          <p
            style={{
              margin: "0",
              color: "#586069",
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Public Repos
          </p>
        </div>
      </div>
    </div>
  );
}
