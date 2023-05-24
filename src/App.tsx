import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import UserCards from "./UserCards";
import { Grid, Button, Typography } from "@mui/material";
import { Users } from "./Types";

export default function App() {
  const [userInfo, setUserInfo] = useState<Users[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const storedUsers = localStorage.getItem("userInfo");
        if (storedUsers) {
          setUserInfo(JSON.parse(storedUsers));
        } else {
          const response = await fetch("https://randomuser.me/api/?results=50");
          const data = await response.json();
          localStorage.setItem("userInfo", JSON.stringify(data.results));
          const storedData: string | null = localStorage.getItem("userInfo");
          if (storedData) {
            setUserInfo(JSON.parse(storedData));
          }
        }
        setLoading(false);
      } catch (err: any) {
        console.log(err.message);
      }
    }
    fetchData();
  }, []);

  async function handleRefresh() {
    setLoading(true);
    const response = await fetch("https://randomuser.me/api/?results=50");
    const data = await response.json();
    localStorage.setItem("userInfo", JSON.stringify(data.results));
    const storedData: string | null = localStorage.getItem("userInfo");
    if (storedData) {
      setUserInfo(JSON.parse(storedData));
    }
    setLoading(false);
  }

  return (
    <div>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress size={80} />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 5,
              background: "#1a2027",
              paddingLeft: 15,
              paddingRight: 15,
              borderBottom: 1,
              borderColor: "white",
              marginBottom: 3,
            }}
          >
            <Button
              onClick={handleRefresh}
              sx={{
                marginBottom: 2,
                background: "#a889f3",
                fontWeight: "bold",
                "&:hover": { background: "#a020f0" },
              }}
              variant="contained"
            >
              Refresh
            </Button>
            <Typography gutterBottom variant="h3" component="div">
              <span style={{ color: "white" }}>Total:</span>{" "}
              <span style={{ color: "#a889f3" }}>{userInfo.length}</span>
            </Typography>
          </Box>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{ background: "#1a2027" }}
          >
            {userInfo.map((user: Users, index: number) => (
              <UserCards
                key={user.id}
                index={index}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                user={user}
              />
            ))}
          </Grid>
        </>
      )}
    </div>
  );
}
