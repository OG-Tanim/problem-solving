// {
//       name: "Jhon",
//       description: "junior full stack developer",
//       interests: ["novo stack", "mern stack", "ios"],
//       socials: [
//         {
//           platform: "Facebook",
//           link: "https://facebook.com/somebody.named.me",
//         },
//         { platform: "LinkedIn", link: "https://linkedin.com/somebody.name.me" },
//       ],
// }

function interests(intArray) {
  return (
    <ul>
      {intArray.map((e) => {
        return <li style={styles.interest}>{e}</li>;
      })}
    </ul>
  );
}

function socials(Array) {
  return Array.map((e) => {
    return (
      <a
        href={e.link}
        target="_blank"
        rel="noopener noreferrer"
        style={styles.links}
      >
        {e.platform}
      </a>
    );
  });
}

export function Card({ state }) {
  return (
    <div style={styles.parent}>
      {state.map((e) => (
        <div key={e.name} style={styles.child}>
          <h1 style={styles.header}>{e.name}</h1>
          <p style={styles.description}>{e.description}</p>
          <h2 style={styles.header}>Interests</h2>
          {interests(e.interests)}
          <div style={styles.socialLinks}>
            <a
              href={e.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.links}
            >
              LinkedIn
            </a>
            <a
              href={e.twitter}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.links}
            >
              Twitter
            </a>
            {socials(e.otherSocials)}
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  parent: {
    width: "1400px",
    margin: "50px auto",
  },

  child: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "0px 20px 30px",
    margin: "20px",
    maxWidth: "350px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f8f9fa",
  },

  header: { color: "#333", marginBottom: "5px" },
  description: { fontSize: "25px", color: "#555" },
  interest: { fontSize: "20px", listStyle: "none", marginLeft: "-40px" },
  socialLinks: { marginLeft: "-20px" },
  links: {
    color: "#fff",
    textDecoration: "none",
    backgroundColor: "#007Bff",
    borderRadius: "5px",
    display: "inline-block",
    margin: "10px 10px 10px 20px",
    padding: "10px 15px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
};
